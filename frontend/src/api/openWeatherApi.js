const forecast = (route) => {
  let checkpointsList = [];
  const legs = route.legs;

  for (const leg of legs) {
    for (const step of leg.steps) {
      const last = step.geometry.coordinates.length - 1;
      const checkpoint = {
        coordinate: step.geometry.coordinates[last],
        duration: step.duration,
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
