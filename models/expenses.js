const Sequelize= require('sequelize');
const sequelize= require('../utils/database');

const Expense = sequelize.define('expenses', {
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true,
    },
    amount:{
        type:Sequelize.DOUBLE,
        allowNull:false
    },
    description:{
        type:Sequelize.STRING,
        allowNull:false
    },
    category:{
        type:Sequelize.STRING,
        allowNull:false
    }
})

module.exports=Expense;