const Sequelize=require('sequelize');
const sequelize=require('../utils/database');

const Download= sequelize.define('downloads', {
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    links:{
        type:Sequelize.STRING,
        allowNull:false
    }
})

module.exports=Download;