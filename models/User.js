const Sequelize= require('sequelize');
const sequelize= require('../utils/database');
const { type } = require('os');
const { timeStamp } = require('console');

const User = sequelize.define('users', {
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    email:{
        type:Sequelize.STRING,
        allowNull:false
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false
    }
},{
    timeStamp:false
});

module.exports=User;