const weatherMarkers = (markers, map) => {
  for (const marker of markers) {
    const id = markers.indexOf(marker);
    const iconId = "icon" + id;
    const sourceId = "source" + id;

    map.current.loadImage(marker.icon, (err, image) => {
      if (err) throw err;
      if (map.current.hasImage(iconId)) {
        map.current.updateImage(iconId, image);
      } else {
        map.current.addImage(iconId, image);
      }
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
                temp: `${marker.temp} \u00B0 C`,
                precipitation: `Expected rain: ${marker.precipitation} mm`,
                humidity: `Humidity: ${marker.humidity}%`,
                windSpeed: `Wind: ${marker.windSpeed} metre/sec`,
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
          "icon-allow-overlap": true,
          "text-field": [
            "format",
            ["get", "title"],
            { "font-scale": 1.2 },
            "\n",
            {},
            ["get", "temp"],
            { "font-scale": 0.8 },
            "\n",
            {},
            ["get", "precipitation"],
            { "font-scale": 0.8 },
            "\n",
            {},
            ["get", "windSpeed"],
            { "font-scale": 0.8 },
            "\n",
            {},
            ["get", "humidity"],
            { "font-scale": 0.8 },
          ],
          "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
          "text-offset": [0, 1.25],
          "text-anchor": "top",
        },
      });
    });
  }
};

export default weatherMarkers;

/*
[
'format',
['get', 'name_en'],
{ 'font-scale': 1.2 },
'\n',
{},
['get', 'name'],
{
'font-scale': 0.8,
'text-font': [
'literal',
['DIN Offc Pro Italic', 'Arial Unicode MS Regular']
]
}
]
*/
