import { IRoutesService } from "../../interfaces/IRoutesService";
import { IRoute } from "../../models/IRoute";
import { api } from "../Api";


export const RoutesService = (): IRoutesService => {
  const getRoutes = async (): Promise<IRoute[]> => {
    const result = await api.get<[]>(
      `/routes`,
    );
    return result.data;
  };

  return {
    getRoutes,
  };
};
