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
    const checkpoint = {
      coordinate: step.geometry.coordinates[last], // [lng, lat]
      duration: Math.round(sumDuration), // in seconds
    };
    checkpointsList.push(checkpoint);
  }
}
// console.log("original length", checkpointsList.length, checkpointsList);

const newCheckpointsList = checkpointsList.filter((element, i) => i % 7 === 0); // keeps every Nth element
// console.log("shortened length", newCheckpointsList.length, newCheckpointsList);

console.log(Math.round(Date.now() / 1000));
setTimeout(() => {
  console.log(Math.round(Date.now() / 1000));
}, 1000);
