require("dotenv").config();
const {Sequelize} = require('sequelize');

const sequalize = new Sequelize({
    dialect  : process.env.DB_DIALECT,
    host     : process.env.DB_HOST,
    port     : process.env.DB_PORT,
    username : process.env.DB_USERNAME,
    database : process.env.DB_NAME,
    password : process.env.DB_PASSWORD
});

module.exports = sequalize;