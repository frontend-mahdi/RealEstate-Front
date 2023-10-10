import { markers } from "@/data/markers";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import mapboxgl, { LngLatLike } from "mapbox-gl";
import { FC, useEffect, useRef } from "react";
import BasicModal from "./Modal";
mapboxgl.accessToken =
  "pk.eyJ1IjoiZmFrZXVzZXJnaXRodWIiLCJhIjoiY2pwOGlneGI4MDNnaDN1c2J0eW5zb2ZiNyJ9.mALv0tCpbYUPtzT7YysA2g";

export interface MapType {}

const Map: FC<MapType> = () => {
  const center: LngLatLike = [54.52824840411543, 24.37560045517577];
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const styles = [
    "mapbox://styles/mapbox/streets-v12",
    "mapbox://styles/mapbox/outdoors-v12",
    "mapbox://styles/mapbox/dark-v11",
    "mapbox://styles/mapbox/navigation-night-v1",
  ];
  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainerRef.current!,
      center,
      style: styles[1], // style URL
      zoom: 5,
      // customAttribution: "MY MAP",
      attributionControl: false,
    });
    // Add zoom and rotation controls to the map.
    map.current.addControl(new mapboxgl.NavigationControl(), "top-left");

    // Add full screen control to the map.
    map.current.addControl(
      new mapboxgl.FullscreenControl({
        // container: FullScreenElementRef,
      }),
      "top-left"
    );

    // map.current.addControl(
    //   new mapboxgl.GeolocateControl({
    //     showUserLocation: true,
    //   })
    // );
    map.current.addControl(new mapboxgl.ScaleControl());
    map.current.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        autocomplete: true,
      }),
      "top-right"
    );
    // Create a default Marker and add it to the map.
    const marker = new mapboxgl.Marker({
      draggable: true,
    })
      .setLngLat(center)
      .addTo(map.current);

    function onDragEnd() {
      const lngLat = marker.getLngLat();
      console.log(`Longitude: ${lngLat.lng}\nLatitude: ${lngLat.lat}`);
    }

    marker.on("dragend", onDragEnd);
    // Create a default Marker and add it to the map. End
    // Add markers to the map.
    for (const marker of markers.features) {
      // Create a DOM element for each marker.
      const el = document.createElement("div");
      const width = marker.properties.iconSize[0];
      const height = marker.properties.iconSize[1];
      el.className = "marker";
      el.style.backgroundImage = `url(https://placekitten.com/g/${width}/${height}/)`;
      el.style.width = `${width}px`;
      el.style.height = `${height}px`;
      el.style.backgroundSize = "100%";

      el.addEventListener("click", () => {
        window.alert(marker.properties.message);
      });

      new mapboxgl.Marker(el, {
        draggable: true,
      })
        .setLngLat(marker.geometry.coordinates as LngLatLike)
        .addTo(map.current);
    }
    // Add markers to the map. End
  });
  const toggleSidebar = () => {
    const panel = panelRef.current;

    const collapsed = panel?.style.right === "-262px";
    // const collapsed = panel?.classList.toggle("translate-x-[262px]");
    if (panel) panel.style.right = !collapsed ? "-262px" : "0";
    map.current?.easeTo({
      // padding:padding,
      padding: {
        right: collapsed ? 0 : 262,
        left: 0,
        top: 0,
        bottom: 0,
      },
      duration: 1000, // In ms. This matches the CSS transition duration property.
    });
  };

  return (
    <>
      <div ref={mapContainerRef} className="map-container"></div>

      <Paper
        ref={panelRef}
        sx={{
          position: "absolute",
          right: "0",
          top: "0",
          height: "100vh",
          width: "262px",
          pt: "3rem",
          pb: "3rem",
          transition: "transform",
          color: grey[400],
        }}
      >
        <Stack
          direction="column"
          sx={{
            paddingY: "1rem",
            boxSizing: "border-box",
            paddingInline: "1rem",
            maxHeight: "calc(100vh - 6rem)",
            overflowY: "auto",
          }}
          spacing={2}
        >
          {Array.from([1, 2, 3]).map((val, key) => (
            <Box key={key}>
              <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  sx={{ height: 100 }}
                  image={`https://picsum.photos/300/15${key}`}
                  title="green iguana"
                />

                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Lizard
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    className="text-justify"
                  >
                    Lizards are a widespread group of squamate reptiles, with
                    over 6,000 species.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" variant="outlined">
                    Locate
                  </Button>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
            </Box>
          ))}
        </Stack>
        <BasicModal />

        <Box
          onClick={toggleSidebar}
          sx={{
            position: "absolute",
            top: "48.5vh",
            left: "-2rem",
            padding: "6px 8px 3px",
            borderRadius: "5px",
            backgroundColor: grey[100],
            color: grey[700],
            cursor: "pointer",
          }}
        >
          &#9776;
        </Box>
      </Paper>
    </>
  );
};

export default Map;
