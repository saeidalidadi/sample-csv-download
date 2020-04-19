const Http = require("http");
const dbClient = require("./db");
const JSONStream = require("JSONStream");
const UserModel = require("./model").User;
const Express = require("express");
const app = Express();
const { parser: csvParser } = require("./csv-parser");

// Todo: use a template engine 
app.get("/", (req, res) => {
  res.send(`
    <html>
      <head><title>Users Link</title></head>
      <body>
        Download all users as csv file from\
        <a style="font-size: 20" href='/users'>here</a>
      </body>
    </html>
  `);
})

app.get("/users", async (req, res) => {

  const cursor = await UserModel.find().cursor();

  res.setHeader('Content-Disposition', `attachment; filename=\"users-${Date.now()}.csv\"`);
  res.set('Content-Type', 'text/csv');
  cursor
    .pipe(JSONStream.stringify())
    .pipe(csvParser)
    .pipe(res)
})


const start = async (done) => {
  try {
    const db = await dbClient.connect();
    console.log("connection created to mongodb.")

    const { PORT, HOST } = process.env;
    const server = app.listen(PORT, HOST, (err) => {
      const { address, port } = server.address();
      console.log("Lisening on: %s:%s", address, port)

      // callback for external use
      done && done({ server, db })
    });

    return { server, db };
  } catch (err) {
    throw err
  }

}

exports.start = start;
exports.app = app;
