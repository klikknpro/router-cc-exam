require("dotenv").config();
const port = 8080;
const mongoose = require("mongoose");
const app = require("./app");

mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(port, () => {
      console.log(`Router is listening on port ${port}. Run: "brew services start mongodb-community"`);
    });
  })
  .catch((error) => console.log(error));
