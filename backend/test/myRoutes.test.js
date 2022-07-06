require("dotenv").config();
const app = require("../app");
const mockServer = require("supertest"); // including superagent
const { MongoMemoryServer } = require("mongodb-memory-server");
const { startDb, stopDb, deleteAll } = require("./util/inMemoryDb");
const User = require("../model/user");
const jwt = require("jsonwebtoken");

describe("Requests to /api/my-routes", () => {
  let connection;
  let server;
  let client;

  beforeAll(async () => {
    const result = await startDb();
    connection = result[0];
    server = result[1];
    client = mockServer.agent(app);
  });

  afterEach(async () => {
    await deleteAll(User);
  });

  afterAll(async () => {
    await stopDb(connection, server);
  });

  describe("POST request with valid data", () => {
    test("should return 200 and the new route object", async () => {
      // given
      const newUser = new User({
        username: "johnDoe",
        providers: {
          google: "1234",
        },
        myRoutes: [],
      });
      await newUser.save();

      const token = jwt.sign({ userId: newUser._id, providers: newUser.providers }, process.env.SECRET_KEY);

      const newRoute = {
        description: "evening rush",
        from: [-73.985734, 40.738147],
        to: [-74.002423, 40.734337],
        coordinates: [
          [-73.985734, 40.738147],
          [-73.985681, 40.73822],
          [-73.990532, 40.74027],
        ],
        distance: 12,
        tFactor: [800, 800, 801, 801, 800],
        isPublic: false,
      };

      // when
      const response = await client.post("/api/my-routes").send(newRoute).set("authorization", token);

      // then
      // console.log(response._body.data);
      expect(response.status).toBe(200);
      expect(response._body.data).toHaveProperty("_id");
      expect(response._body.data.myRoutes[0]).toHaveProperty("description");
    });

    test("should return 404 if user not found", async () => {
      // given
      const newUser = new User({
        username: "johnDoe",
        providers: {
          google: "1234",
        },
        myRoutes: [],
      });
      await newUser.save();

      const token = jwt.sign({ userId: newUser._id, providers: newUser.providers }, process.env.SECRET_KEY);

      const newRoute = {
        description: "evening rush",
        from: [-73.985734, 40.738147],
        to: [-74.002423, 40.734337],
        coordinates: [
          [-73.985734, 40.738147],
          [-73.985681, 40.73822],
          [-73.990532, 40.74027],
        ],
        distance: 12,
        tFactor: [800, 800, 801, 801, 800],
        isPublic: false,
      };

      await User.deleteMany();

      // when
      const response = await client.post("/api/my-routes").send(newRoute).set("authorization", token);

      // then
      expect(response.status).toBe(404);
    });
  });

  describe("POST request with missing data from body", () => {
    test("should return 400", async () => {
      // given
      const newUser = new User({
        username: "johnDoe",
        providers: {
          google: "1234",
        },
        myRoutes: [],
      });
      await newUser.save();

      const token = jwt.sign({ userId: newUser._id, providers: newUser.providers }, process.env.SECRET_KEY);

      const newRoute = {
        description: "evening rush",
        to: [-74.002423, 40.734337],
        coordinates: [
          [-73.985734, 40.738147],
          [-73.985681, 40.73822],
          [-73.990532, 40.74027],
        ],
        distance: 12,
        tFactor: [800, 800, 801, 801, 800],
        isPublic: false,
      };

      // when
      const response = await client.post("/api/my-routes").send(newRoute).set("authorization", token);

      // then
      // console.log(response.text);
      expect(response.status).toBe(400);
      expect(response.text).toStrictEqual("Missing data from body");
    });
  });
});
