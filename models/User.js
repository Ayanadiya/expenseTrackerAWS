const Sequelize= require('sequelize');
const sequelize= require('../utils/database');

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
        allowNull:false,
        unique:true
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false
    },
    isPremiumuser:Sequelize.BOOLEAN,
    totalexpense:{
        type:Sequelize.DOUBLE,
        allowNull:false
    }
},{
    timeStamp:false
});

module.exports=User;