const Http = require("http");
const dbClient = require("./db");
const JSONStream = require("JSONStream");
const UserModel = require("./model").User;
const Express = require("express");
const app = Express();
const {
  Parser,
  Transform,
  transforms: { unwind }
} = require("json2csv");


app.get("/", (req, res) => {
  res.send(`
    <html>
      <body>
        Download all users as csv file from\
        <a style="font-size: 20" href='/users'>here</a>
      </body>
    </html>
  `);
})

app.get("/users", async (req, res) => {

  const cursor = await UserModel.find({}).cursor();

  const fields = ['name', 'birthdate', "email", 'products.name', 'products.categories'];
  const transforms = [unwind(['products'])];
  const csvParser = new Transform({ fields, transforms });

  res.setHeader('Content-Disposition', `attachment; filename=\"users-${Date.now()}.csv\"`);
  cursor
    .pipe(JSONStream.stringify())
    .pipe(csvParser)
    .pipe(res.type("text/csv"))
})


const start = async () => {
  try {
    const db = await dbClient.connect();
    console.log("connection created to mongodb.")

    const { PORT, HOST } = process.env;
    const server = app.listen(PORT, HOST, (err) => {
      const { address, port } = server.address();
      console.log("Lisening on: %s:%s", address, port)
    });

    return { server, db };
  } catch (err) {
    throw err
  }

}

exports.start = start;
exports.app = app;

process.on("uncaughtException", (err) => {
  console.log(err);
  process.exit(1);
})
