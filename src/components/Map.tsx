import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import mapboxgl from "mapbox-gl";
import { FC, useEffect, useRef } from "react";
mapboxgl.accessToken =
  "pk.eyJ1IjoiZmFrZXVzZXJnaXRodWIiLCJhIjoiY2pwOGlneGI4MDNnaDN1c2J0eW5zb2ZiNyJ9.mALv0tCpbYUPtzT7YysA2g";

export interface MapType {}

const Map: FC<MapType> = () => {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
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
      center: [51.388973, 35.689198],
      style: styles[1], // style URL
      zoom: 5,
      // customAttribution: "MY MAP",
      attributionControl: false,
      cooperativeGestures: true,
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
      }),
      "top-right"
    );
    const marker = new mapboxgl.Marker({
      draggable: true,
    })
      .setLngLat([51.388973, 35.689198])
      .addTo(map.current);

    function onDragEnd() {
      const lngLat = marker.getLngLat();
      console.log(`Longitude: ${lngLat.lng}\nLatitude: ${lngLat.lat}`);
    }

    marker.on("dragend", onDragEnd);
  });

  return (
    <>
      <div ref={mapContainerRef} className="map-container"></div>
    </>
  );
};

export default Map;
