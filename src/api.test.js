const app = require("./app");
const request = require("supertest");
const UserModel = require("./model").User;
const { generateUser } = require("../scripts/helpers");
const fs = require("fs");

let server;
let db;

beforeAll((done) => {
  app.start((cat) => {
    server = cat.server;
    db = cat.db;
    done()
  });
})

afterAll(() => {
  server.close();
  db.close()
})

test("should get home page with a download link of users.", (done) => {
  request(server).get("/")
    .expect(200)
    .end(done);
});

test("should download users as a csv file.", async (done) => {

  let users = [
    generateUser(),
    generateUser(),
    generateUser(),
    generateUser()
  ]
  await UserModel.deleteMany({});

  users.forEach(async item => {
    await UserModel.create(item);
  })

  let req = request(server).get("/users")
  req.end(async (err, res) => {
    let fileName = res.header["content-disposition"].split("filename=")[1];
    let { text } = res;
    fileName = fileName.substring(1, fileName.length - 1);

    // check rows
    let csvRows = text.split("\n");
    expect(csvRows.length).toEqual(users.length + 1);

    // check headers to be the same
    let csvHeaders = csvRows[0].split(",");
    expect(csvHeaders.length).toEqual(4);

    // check sample data
    let nameSample = users[0].name;
    expect(
      (new RegExp(nameSample)).test(text)
    ).toBe(true);

    // write to a file for eye testing
    fs.writeFileSync(__dirname + "/" + fileName, res.text);

    done()
  })

})