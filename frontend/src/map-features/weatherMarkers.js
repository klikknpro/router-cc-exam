import Marker from "../components/Marker";

const weatherMarkers = (markers, map) => {
  const features = markers.map((marker) => ({
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: marker.coordinate,
    },
    properties: {
      title: "Weather",
      description: marker.description,
    },
  }));

  const geojson = {
    type: "FeatureCollection",
    features: features,
  };

  for (const feature of geojson.features) {
    //
  }
};

export default weatherMarkers;

/*

*/
