import { React, useState, useEffect, useRef } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax

/* this version is based on the Original MapBox tutorial */
const Home = () => {
  const mapContainer = useRef(null);
  const map = useRef(null); // rendered element
  const [lng, setLng] = useState(19.0402);
  const [lat, setLat] = useState(47.4979);
  const start = [lng, lat]; // initial directions
  const [zoom, setZoom] = useState(10);

  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

  /* this nice little navigation button that locates my device */
  /* access to the browser's Geolocation API via the GeolocateControl */
  /* https://docs.mapbox.com/mapbox-gl-js/api/markers/#geolocatecontrol#trigger */
  const locateFeature = () => {
    map.current.addControl(
      new mapboxgl.GeolocateControl({
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
      })
    );
  };

  const navigationFeature = () => {
    map.current.addControl(new mapboxgl.NavigationControl());
  };

  const route = () => {
    // adding the feature to my map
    locateFeature(); // might need to add a .trigger() ??
    // extra navigation controls
    navigationFeature();

    // action to do when we click the map (event listener)
    map.current.on("load", () => {
      // add a starting point (in a form of a Layer) as soon as the map is "loaded", visually complete render
      // but its Budapest only, not the precise location
      map.current.addLayer({
        id: "point",
        type: "circle",
        source: {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                properties: {},
                geometry: {
                  type: "Point",
                  coordinates: start,
                },
              },
            ],
          },
        },
        paint: {
          "circle-radius": 10,
          "circle-color": "#3887be",
        },
      });
    });

    map.current.on("click", (event) => {
      let endCoords = [];
      for (const key in event.lngLat) {
        endCoords.push(event.lngLat[key]);
      }

      // IF !!!!! "end" layer already exists, then this will be geojson data for its source
      const end = {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {},
            geometry: {
              type: "Point",
              coordinates: endCoords,
            },
          },
        ],
      };

      if (map.current.getLayer("end")) {
        map.current.getSource("end").setData(end);
      } else {
        map.current.addLayer({
          id: "end",
          type: "circle",
          source: {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: [
                {
                  type: "Feature",
                  properties: {},
                  geometry: {
                    type: "Point",
                    coordinates: endCoords,
                  },
                },
              ],
            },
          },
          paint: {
            "circle-radius": 10,
            "circle-color": "#f30",
          },
        });
      }
    });
  };

  useEffect(() => {
    // on load
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
    // on map movement
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
    route();
    // eslint-disable-next-line
  }, [map.current]);

  return (
    <div>
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
};

export default Home;
