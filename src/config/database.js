const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('crud_db12', 'root', '12345', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;