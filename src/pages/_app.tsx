import "@/app/globals.css";
import MainLayout from "@/layouts/MainLayout";
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
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </ThemeProvider>
    </div>
  );
};

export default App;
