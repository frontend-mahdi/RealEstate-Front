import "@/app/globals.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import "mapbox-gl/dist/mapbox-gl.css";
import { AppProps } from "next/app";
import { FC } from "react";
const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <div className="layout">
      <Component {...pageProps} />
    </div>
  );
};

export default App;
