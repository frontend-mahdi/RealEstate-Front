import "@/app/globals.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { ThemeProvider, createTheme } from "@mui/material";
import "mapbox-gl/dist/mapbox-gl.css";
import { AppProps } from "next/app";
import { FC } from "react";
const App: FC<AppProps> = ({ Component, pageProps }) => {
  const theme = createTheme({
    typography: {
      button: {
        textTransform: "none",
      },
    },
  });
  return (
    <div className="layout">
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </div>
  );
};

export default App;
