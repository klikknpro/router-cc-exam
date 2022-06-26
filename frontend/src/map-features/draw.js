import MapboxDraw from "@mapbox/mapbox-gl-draw";

const drawFeature = new MapboxDraw({
  controls: { polygon: false, point: false, combine_features: false, uncombine_features: false },
});

export default drawFeature;
