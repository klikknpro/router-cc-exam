import http from "axios";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import logger from "../utils/logflare";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const directions = async (drawCoordinates, map) => {
  const coordinates = drawCoordinates.join(";");

  try {
    const response = await http.get(
      `https://api.mapbox.com/directions/v5/mapbox/cycling/${coordinates}?steps=true&geometries=geojson&annotations=distance,duration&access_token=${mapboxgl.accessToken}`
    );

    const routeCoords = response.data.routes[0].geometry.coordinates;
    const routeGeojson = {
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: routeCoords,
      },
    };

    if (map.current.getSource("routeLayer")) {
      map.current.getSource("routeLayer").setData(routeGeojson);
    } else {
      map.current.addLayer({
        id: "routeLayer",
        type: "line",
        source: {
          type: "geojson",
          data: routeGeojson,
        },
        layout: {
          "line-join": "round",
          "line-cap": "round",
        },
        paint: {
          "line-color": "#3887be",
          "line-width": 5,
          "line-opacity": 0.75,
        },
      });
    }

    const weatherRoute = response.data.routes[0];
    return weatherRoute;
  } catch (err) {
    logger.error("Mapbox error.", err);
    if (err.status >= 500) return alert("Mapbox server error. Try again later.");
    return alert(`${err.code}: ${err.message}`);
  }
};

export default directions;
