import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { SnackbarProvider } from "notistack";
import { Map } from "./components/map/Map";
import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3}>
        <CssBaseline />
        <Map />
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
