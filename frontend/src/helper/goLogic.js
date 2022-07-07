const long = [
  "a",
  "a",
  "a",
  "a",
  "a",
  "a",
  "a",
  "a",
  "a",
  "a",
  "a",
  "a",
  "a",
  "a",
  "a",
  "a",
  "a",
  "a",
  "a",
  "a",
  "a",
  "a",
  "a",
  "a",
  "a",
  "a",
  "a",
  "a",
  "a",
  "a",
  "a",
  "a",
  "a",
  "a",
  "a",
  "a",
  "a",
  "a",
  "a",
  "a",
  "a",
  "a",
  "a",
  "a",
  "a",
  "a",
];
console.log("long.length", long.length);

let short = [];

if (long.length < 50) {
  const interval = Math.floor(long.length / (long.length - 23));
  console.log("interval", interval);
  const veryShort = long;

  for (let k = 1; k < interval; k++) {
    veryShort.splice(k * interval, 1);
  }
  console.log("veryShort.length", veryShort.length);
  //
} else {
  const section = Math.floor(long.length / 23);
  console.log("section", section);

  for (let i = section; i <= section * 23; i += section) {
    short.push(long[i]);
  }
  console.log("short.length", short.length);
}
