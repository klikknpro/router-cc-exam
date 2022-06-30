const shortRoute = require("./short");
const longRoute = require("./long");

///

let checkpointsList = [];
let sumDuration = 0;
const legs = longRoute.routes[0].legs;

for (const leg of legs) {
  for (const step of leg.steps) {
    const last = step.geometry.coordinates.length - 1;
    sumDuration += step.duration;
    const roundToMinutes = Math.round(sumDuration / 60) * 60;
    const checkpoint = {
      coordinate: step.geometry.coordinates[last], // [lng, lat]
      duration: roundToMinutes, // in seconds rounded to minutes
    };
    checkpointsList.push(checkpoint);
  }
}
console.log("original", checkpointsList);

const quarterWay = Math.round(checkpointsList.length / 4);

const newCheckpointsList = [
  checkpointsList[0],
  checkpointsList[quarterWay],
  checkpointsList[quarterWay * 2],
  checkpointsList[quarterWay * 3],
  checkpointsList[checkpointsList.length - 1],
];

console.log("shortened", newCheckpointsList);

// console.log(Math.round(Date.now() / 1000));
// setTimeout(() => {
//   console.log(Math.round(Date.now() / 1000));
// }, 1000);
