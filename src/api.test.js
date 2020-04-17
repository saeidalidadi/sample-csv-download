const app = require("./app");
const request = require("supertest");

let server;
let db;

beforeAll(async () => {
  const Server = await app.start();
  server = Server.server;
  db = Server.db;
})

afterAll(() => {
  server.close();
  db.close()
})

test("should get home page with a download link of users.", async (done) => {
  const homePage = await request(server).get("/");
  console.log("status", homePage.status);
  expect(homePage.status).toEqual(200);
  // Todo: inspect for download link
  done();
});

test("should download users as a csv file.", async(done) => {
  const usersCsv = await request(server).get("/users")
  console.log(usersCsv.status)
  console.log("users", usersCsv);
  expect(usersCsv.status).toEqual(200);
  // Todo: assertion for some users that we have been created from test runner
  done()
})

