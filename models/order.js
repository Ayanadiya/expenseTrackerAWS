const Sequelize = require('sequelize');
const sequelise= require('../utils/database');


const Order = sequelise.define('orders',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    paymentid:Sequelize.STRING,
    orderid:Sequelize.STRING,
    status:Sequelize.STRING
})

module.exports=Order;