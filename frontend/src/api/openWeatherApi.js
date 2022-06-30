const forecast = (route) => {
  let checkpointsList = [];
  let sumDuration = 0;
  const legs = route.legs;

  for (const leg of legs) {
    for (const step of leg.steps) {
      const last = step.geometry.coordinates.length - 1;
      sumDuration += step.duration;
      const checkpoint = {
        coordinate: step.geometry.coordinates[last], // [lng, lat]
        duration: Math.round(sumDuration),
      };
      checkpointsList.push(checkpoint);
    }
  }

  console.log("original", checkpointsList);

  const newCheckpointsList = checkpointsList.filter((_, i) => {
    return (i + 1) % 8;
  }); // keeps every Nth element

  console.log("shortened", newCheckpointsList);
};

export default forecast;
