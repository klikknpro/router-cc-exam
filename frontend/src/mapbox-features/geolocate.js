import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax

/* === >>> locate button <<< === */
const geolocateFeature = new mapboxgl.GeolocateControl({
  positionOptions: {
    enableHighAccuracy: true,
  },
  trackUserLocation: false,
  style: {
    right: 10,
    top: 10,
  },
  position: "bottom-left",
  showUserHeading: true,
});

export default geolocateFeature;
