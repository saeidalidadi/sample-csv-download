const faker = require("faker");

const generateUser = () => {
  const user = {
    name: faker.name.findName(),
    id: faker.random.uuid(),
    birthdate: faker.date.future(),
    email: faker.internet.email(),
    products:
      [faker.commerce.productName(), faker.commerce.productName()]
  }

  return user;
}

exports.generateUser = generateUser;