const Sequelize=require('sequelize');
const sequelize=require('../utils/database');

const Leaderboard = sequelize.define('expensetotal', {
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    totalexpense:{
        type:Sequelize.DOUBLE,
        allowNull:false
    }
})

module.exports=Leaderboard;