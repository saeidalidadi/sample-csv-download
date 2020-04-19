const Mongoose = require("mongoose");
Mongoose.Promise = Promise;

const createConnection = async () => {

  const { DB_PORT, DB_USER, DB_PASS, DB_NAME } = process.env;

  // Ignore mongodb authentication for your environment
  let uri = DB_USER && DB_PASS
    ? `mongodb://${DB_USER}:${DB_PASS}@localhost:${DB_PORT}/${DB_NAME}?poolSize=4`
    : `mongodb://localhost:${DB_PORT || 27017}/${DB_NAME}?poolSize=4`

  const clientOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }

  await Mongoose.connect(uri, clientOptions);
  
  return Mongoose.connection
}

exports.connect = createConnection;
