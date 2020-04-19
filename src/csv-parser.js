const {
  Parser,
  Transform,
  transforms: { unwind, flatten }
} = require("json2csv");

const fields = ['name', 'birthdate', "email", 'products'];
const transforms = [flatten(['products'])];
const csvParser = new Transform({ fields, transforms });

exports.parser = csvParser
exports.transformer = csvParser
