import { FC } from "react";
import DriverIcon from '@mui/icons-material/DriveEta';
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";

export const Navbar: FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <DriverIcon />
        </IconButton>
        <Typography variant="h6">Code Delivery</Typography>
      </Toolbar>
    </AppBar>
  );
};