const shortRoute = require("./short");
const longRoute = require("./long");

///

let checkpointsList = [];
const legs = shortRoute.routes[0].legs;

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

console.log(checkpointsList);
/*
<lon>,<lat>;<lon>,<lat>
*/
