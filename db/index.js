const Sequelize = require('sequelize');

const db = new Sequelize('postgres://DBNAMEHERE', {
  logging: false // unless you like the logs
  // ...and there are many other options you may want to play with
});

module.exports = db;