const weatherMarkers = (markers, map) => {
  for (const marker of markers) {
    const id = markers.indexOf(marker);
    const iconId = "icon" + id;
    const sourceId = "source" + id;

    map.current.loadImage(marker.icon, (err, image) => {
      if (err) throw err;
      map.current.addImage(iconId, image);
      map.current.addSource(sourceId, {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "feature",
              geometry: {
                type: "Point",
                coordinates: marker.coordinate,
              },
              properties: {
                title: marker.description,
              },
            },
          ],
        },
      });
      map.current.addLayer({
        id: "layer" + id,
        type: "symbol",
        source: sourceId,
        layout: {
          "icon-image": iconId,
          // get the title name from the source's "title" property
          "text-field": ["get", "title"],
          "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
          "text-offset": [0, 1.25],
          "text-anchor": "top",
        },
      });
    });
    console.log("layer", id, "is added");
  }
};

export default weatherMarkers;

/*
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
*/
