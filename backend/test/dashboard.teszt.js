require("dotenv").config();
const app = require("../app");
const jwt = require("jsonwebtoken");
const mockServer = require("supertest");
// const { MongoMemoryServer } = require("mongodb-memory-server");
const User = require("../model/user");
const { startDb, stopDb, deleteAll } = require("./util/inMemoryDb");

describe("requests to api/dashboards", () => {
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

  test("new something something", async () => {
    // given
    // can be multiple client.set();
    // when
    // then
  });

  test("something something", async () => {});
});
