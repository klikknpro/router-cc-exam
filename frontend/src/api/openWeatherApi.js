const forecast = (route) => {
  let allCheckpoints = [];
  let sumDuration = 0;
  const legs = route.legs;

  for (const leg of legs) {
    for (const step of leg.steps) {
      const last = step.geometry.coordinates.length - 1;
      sumDuration += step.duration;
      const checkpoint = {
        coordinate: step.geometry.coordinates[last], // [lng, lat]
        duration: Math.round(sumDuration), // in seconds
      };
      allCheckpoints.push(checkpoint);
    }
  }

  const quarterWay = Math.round(allCheckpoints.length / 4);
  const weatherCheckpoints = [
    allCheckpoints[0],
    allCheckpoints[quarterWay],
    allCheckpoints[quarterWay * 2],
    allCheckpoints[quarterWay * 3],
    allCheckpoints[allCheckpoints.length - 1],
  ];
  console.log(weatherCheckpoints);
};

export default forecast;
