const mysql= require('mysql2')
const {Sequelize}= require('sequelize');
require('dotenv').config()

console.log({
  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_HOST: process.env.DB_HOST
});

const sequelize= new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host:process.env.DB_HOST,
        dialect: 'mysql',
        port:3306
    }
)

module.exports = {sequelize};