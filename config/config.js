const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  "mysql://master_daniela:Acamica123@automosaiko.tk:3306/master_daniela"
);

module.exports = sequelize;
