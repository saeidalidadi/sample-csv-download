const Mongoose = require("mongoose")


const userSchema = new Mongoose.Schema({
  name: String,
  id: String,
  email: String,
  birthdate: Date,
  products: [String]
})

exports.User = Mongoose.model("User", userSchema);
