const faker = require("faker");

const generateUser = async () => {
  const user = {
    name: faker.name.findName(),
    id: faker.random.uuid(),
    birthdate: faker.date.future(),
    email: faker.internet.email(),
    products: [{
      name: faker.commerce.productName(),
      categories:
        `${faker.commerce.productAdjective()}, ${faker.commerce.productAdjective()}`,
    }]
  }

  return user;
}

exports.generateUser = generateUser;