const data = require("./geocodes.json");

const coordinates = data.routes[0].geometry.coordinates;
const text = coordinates.join(";");

console.log(text);

/*
<lon>,<lat>;<lon>,<lat>
*/
