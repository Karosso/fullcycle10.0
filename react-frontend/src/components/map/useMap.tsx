import { SelectChangeEvent } from "@mui/material";
import { useSnackbar } from "notistack";
import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { makeCarIcon } from "../../assets/CarIcon";
import { colors } from "../../assets/colors";
import { makeMarkerIcon } from "../../assets/MarkIcon";
import { Map } from "../../classes/MapClass";
import { RouteExistsError } from "../../errors/route-exists.error";
import { IRoute } from "../../models/IRoute";
import { RoutesService } from "../../services/routes/RoutesService";
import { getCurrentPositionUseCase } from "../../useCases/GetCurrentPositionUseCase";
import GetRoutesUseCase from "../../useCases/GetRoutesUseCase";
import { googleMapsLoader } from "../../services/googleMaps/GoogleMaps";
import useSocketIO from "../../services/socketIO/SocketIO";


const useMap = () => {
  const [routes, setRoutes] = useState<IRoute[]>([]);
  const [firstLoad, setFirstLoad] = useState(true);
  const [selectedRoute, setSelectedRoute] = useState<string>("");
  const { enqueueSnackbar } = useSnackbar();
  const mapRef = useRef<Map>();
  const { connect, socketIORef } = useSocketIO();

  useEffect(() => {
    const getRoutes = async () => {
      const routesService = RoutesService();
      try {
        const result = await GetRoutesUseCase(routesService);
        setRoutes(result);
      } catch (error) {
        console.error({ error });
      }
    };

    const loadMap = async () => {
      try {
        const [, position] = await Promise.all([
          googleMapsLoader?.load(),
          getCurrentPositionUseCase({ enableHighAccuracy: true }),
        ]);
        const divMap = document.getElementById("map") as HTMLElement;
        mapRef.current = new Map(divMap, {
          zoom: 15,
          center: position,
        });
      } catch (error) {
        console.error({ error });
      }
    };

    if (firstLoad) {
      getRoutes();
      loadMap();
      setFirstLoad(false);
    }
  }, [firstLoad]);


  const finishRoute = useCallback(
    (route: IRoute) => {
      enqueueSnackbar(`${route.title} finalizou!`, {
        variant: "success",
      });
      mapRef.current?.removeRoute(route._id);
    },
    [enqueueSnackbar]
  );

  useEffect(() => {
    connect();

    const handler = (data: { routeId: string; position: [number, number]; finished: boolean }) => {
      mapRef.current?.moveCurrentMarker(data.routeId, {
        lat: data.position[0],
        lng: data.position[1],
      });
      const route = routes.find((route) => route._id === data.routeId) as IRoute;
      if (data.finished) {
        finishRoute(route);
      }
    };

    
    const socketIORefTemp = socketIORef.current;
    socketIORefTemp?.on("new-position", handler);
    return () => {
      socketIORefTemp?.off("new-position", handler);
    };
  }, [finishRoute, routes, connect, socketIORef]);

  const handleRoute = useCallback((event: SelectChangeEvent<string>) => {
    setSelectedRoute(event.target.value);
  }, []);

  const startRoute = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      const route = routes?.find((r) => r._id === selectedRoute);
      const colorIndex = Math.floor(Math.random() * 10);
      const color = colors[colorIndex];
      try {
        mapRef.current?.addRoute(selectedRoute, {
          currentMarkerOptions: {
            position: route?.startPosition,
            icon: makeCarIcon(color),
          },
          endMarkerOptions: {
            position: route?.endPosition,
            icon: makeMarkerIcon(color),
          },
        });
        socketIORef.current?.emit("new-direction", {
          routeId: selectedRoute,
        });
      } catch (error) {
        if (error instanceof RouteExistsError) {
          enqueueSnackbar(`${route?.title} já adicionado, espere finalizar.`, {
            variant: "error",
          });
          return;
        }
        console.error({ error });
        throw error;
      }
      console.log(`Start route: ${selectedRoute}`);
    },
    [enqueueSnackbar, routes, selectedRoute, socketIORef]
  );

  return {
    routes,
    selectedRoute,
    handleRoute,
    startRoute,
  };
};

export default useMap;
