import { markers } from "@/data/markers";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import mapboxgl, { LngLatLike } from "mapbox-gl";
import { FC, useEffect, useRef } from "react";
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
    const collapsed = panel?.classList.toggle("translate-x-[262px]");

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
      {/* translate-x-[262px] */}
      <div className=" px-3 pb-3 pt-14">
        <div
          ref={panelRef}
          className="bg-white absolute h-[100vh] w-[262px] right-0 top-0 flex flex-col justify-center items-center transition-all text-gray-400 "
        >
          Right Sidebar
          <div
            className="px-2 pt-2 pb-1 absolute top-[48.5vh] -left-8 rounded-lg bg-white text-gray-700 cursor-pointer"
            onClick={toggleSidebar}
          >
            &#9776;
          </div>
        </div>
      </div>
    </>
  );
};

export default Map;
