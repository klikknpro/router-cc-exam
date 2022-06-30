/*
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
console.log("original length", checkpointsList.length);

const routeLength = checkpointsList.length;
*/

// const lorem =
//   "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti suscipit omnis quas dolor esse cum non, quae nihil mollitia soluta. Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti suscipit omnis quas dolor esse cum non, quae nihil mollitia soluta.";
const lorem = "Lorem ip mollitiadghy met consectetur adipisicing elit.";
const testList = lorem.split("");
console.log("original length", testList.length);

const quarterWay = Math.round(testList.length / 4);

const newList = [
  testList[0],
  testList[quarterWay],
  testList[quarterWay * 2],
  testList[quarterWay * 3],
  testList[testList.length - 1],
];

console.log("newList length", newList.length, "newList", newList);

// const newCheckpointsList = testList.filter((element, i) => i % size === 0); // keeps every Nth element
// console.log("shortened length", newCheckpointsList.length);

// console.log(Math.round(Date.now() / 1000));
// setTimeout(() => {
//   console.log(Math.round(Date.now() / 1000));
// }, 1000);
