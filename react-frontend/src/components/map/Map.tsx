import { Button, Grid, MenuItem, Select } from "@mui/material";
import { FC, memo, useCallback } from "react";
import { Navbar } from "../navbar/Navbar";
import { useStyles } from "./Map.styles";
import useMap from "./useMap";

interface IMapProps {}

export const Map: FC<IMapProps> = memo(() => {
  const { routes, selectedRoute, handleRoute, startRoute } = useMap();

  const styles = useStyles();

  const renderOptions = useCallback(() =>
    routes?.map((it, key) => (
      <MenuItem key={key} value={it._id}>
        {it.title}
      </MenuItem>
    )),[routes]);

  return (
    <Grid container className={styles.container}>
      <Grid item xs={12} sm={3}>
        <Navbar />
        <form onSubmit={startRoute} className={styles.form}>
          <Select fullWidth displayEmpty value={selectedRoute} onChange={handleRoute}>
            <MenuItem value="">
              <em>Selecione uma corrida</em>
            </MenuItem>
            {renderOptions()}
          </Select>
          <div className={styles.btnSubmitWrapper}>
            <Button type="submit" color="primary" variant="contained">
              Iniciar corrida
            </Button>
          </div>
        </form>
      </Grid>
      <Grid item xs={12} sm={9}>
        <div id="map" className={styles.map}></div>
      </Grid>
    </Grid>
  );
});
