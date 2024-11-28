const Sequelize = require('sequelize');

require('dotenv').config();

const databasename=process.env.DATABASE_NAME
const username=process.env.MYSQL_USERNAME
const password=process.env.MYSQL_PASSWORD


const sequelize = new Sequelize( databasename, username, password,{
    dialect:'mysql',
    host:'localhost'
})

module.exports=sequelize;