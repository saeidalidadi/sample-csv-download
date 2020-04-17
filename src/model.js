const Mongoose = require("mongoose")

const productSchema = new Mongoose.Schema({
  name: String,
  categories: String
})

const userSchema = new Mongoose.Schema({
  name: String,
  id: String,
  email: String,
  birthdate: Date,
  products: [productSchema]
})

exports.User = Mongoose.model("User", userSchema);

