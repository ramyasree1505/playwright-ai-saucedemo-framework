const users = {
  standard: {
    username: 'problem_user',
    password: 'secret_sauce',
    storage: 'storage/standard.json'
  },
  admin: {
    username: 'standard_user',
    password: 'secret_sauce',
    storage: 'storage/admin.json'
  }
};

const products = {
  backpack: 'Sauce Labs Backpack',
  bikeLight: 'Sauce Labs Bike Light'
};

module.exports = { users, products };