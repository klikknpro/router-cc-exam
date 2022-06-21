import React from "react";
import { useState, useEffect, useRef } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import http from "axios";

/* this version is based on the Original MapBox tutorial */
const Home = () => {
  const mapContainer = useRef(null); // my DOM element
  const map = useRef(null); // rendered element
  const [lng, setLng] = useState(null);
  const [lat, setLat] = useState(null);
  const [lngInfo, setLngInfo] = useState(19.0402);
  const [latInfo, setLatInfo] = useState(47.4979);
  const [zoomInfo, setZoomInfo] = useState(10);
  // const start = [lng, lat]; // initial directions

  const route = () => {
    // adds a starting point (in a form of a Layer) on load
    // map.current.on("load", () => {
    //   map.current.addLayer({
    //     id: "point",
    //     type: "circle",
    //     source: {
    //       type: "geojson",
    //       data: {
    //         type: "FeatureCollection",
    //         features: [
    //           {
    //             type: "Feature",
    //             properties: {},
    //             geometry: {
    //               type: "Point",
    //               coordinates: start,
    //             },
    //           },
    //         ],
    //       },
    //     },
    //     paint: {
    //       "circle-radius": 10,
    //       "circle-color": "#3887be",
    //     },
    //   });
    // });

    // event listener which adds/updates an "end" layer on click
    map.current.on("click", (event) => {
      let endCoords = [];
      for (const key in event.lngLat) {
        endCoords.push(event.lngLat[key]);
      }
      console.log("from", lng, lat);
      console.log("to", endCoords);

      // IF !!!!! "end" layer already exists, then this will be geojson data for its source
      // const end = {
      //   type: "FeatureCollection",
      //   features: [
      //     {
      //       type: "Feature",
      //       properties: {},
      //       geometry: {
      //         type: "Point",
      //         coordinates: endCoords,
      //       },
      //     },
      //   ],
      // };

      // if (map.current.getLayer("end")) {
      //   map.current.getSource("end").setData(end);
      // } else {
      //   map.current.addLayer({
      //     id: "end",
      //     type: "circle",
      //     source: {
      //       type: "geojson",
      //       data: {
      //         type: "FeatureCollection",
      //         features: [
      //           {
      //             type: "Feature",
      //             properties: {},
      //             geometry: {
      //               type: "Point",
      //               coordinates: endCoords,
      //             },
      //           },
      //         ],
      //       },
      //     },
      //     paint: {
      //       "circle-radius": 10,
      //       "circle-color": "#f30",
      //     },
      //   });
      // }
      // getRoute(endCoords);
    });
  };

  // const getRoute = async (endCoords) => {
  //   const result = await http.get(
  //     `https://api.mapbox.com/directions/v5/mapbox/cycling/${start[0]},${start[1]};${endCoords[0]},${endCoords[1]}?steps=true&geometries=geojson&overview=full&annotations=distance,duration&waypoints=0;1&access_token=${mapboxgl.accessToken}`
  //   );
  //   const data = result.data.routes[0];
  //   const route = data.geometry.coordinates;
  //   const geojson = {
  //     type: "Feature",
  //     properties: {},
  //     geometry: {
  //       type: "LineString",
  //       coordinates: route,
  //     },
  //   };

  //   if (map.current.getSource("route")) {
  //     map.current.getSource("route").setData(geojson);
  //   } else {
  //     map.current.addLayer({
  //       id: "route",
  //       type: "line",
  //       source: {
  //         type: "geojson",
  //         data: geojson,
  //       },
  //       layout: {
  //         "line-join": "round",
  //         "line-cap": "round",
  //       },
  //       paint: {
  //         "line-color": "#3887be",
  //         "line-width": 5,
  //         "line-opacity": 0.75,
  //       },
  //     });
  //   }
  // };

  /* === >>> locate button <<< === */
  const geolocateFeature = new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true,
    },
    trackUserLocation: true,
    style: {
      right: 10,
      top: 10,
    },
    position: "bottom-left",
    showUserHeading: true,
  });

  /* === >>> navigation buttons <<< === */
  const navigationFeature = new mapboxgl.NavigationControl();

  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

  useEffect(() => {
    // on load
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [19.0402, 47.4979],
      zoom: 10,
    });

    map.current.addControl(geolocateFeature);
    map.current.addControl(navigationFeature);

    // trigger geolocate
    map.current.on("load", () => {
      geolocateFeature.trigger();
      // setSomeLoadingMask(true);
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // after load
    if (!map.current) return; // wait for map to initialize

    geolocateFeature.on("geolocate", (data) => {
      setLng(data.coords.longitude.toFixed(4));
      setLat(data.coords.latitude.toFixed(4));
      // setSomeLoadingMask(false);
      console.log("geolocate event", lng, lat);
    });

    // update coordinates info on map movement
    map.current.on("move", () => {
      setLngInfo(map.current.getCenter().lng.toFixed(4));
      setLatInfo(map.current.getCenter().lat.toFixed(4));
      setZoomInfo(map.current.getZoom().toFixed(2));
    });

    // eslint-disable-next-line
  });

  useEffect(() => {
    map.current.on("click", (event) => {
      let endCoords = [];
      for (const key in event.lngLat) {
        endCoords.push(event.lngLat[key]);
      }
      console.log("from", lng, lat);
      console.log("to", endCoords);
    });
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div className="sidebar">
        Longitude: {lngInfo} | Latitude: {latInfo} | Zoom: {zoomInfo}
      </div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
};

export default Home;

/*
geolocateFeature.on('geolocate', () => {
console.log('A geolocate event has occurred.');
});
*/
