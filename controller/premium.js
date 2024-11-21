
const Expense=require('../models/expenses');
const User=require('../models/User');
const sequelize = require('../utils/database');
const Sequelize= require('sequelize');

exports.getleaderboard = async (req,res,next) => {
    try {
          const leaderboard= await Expense.findAll({
            attributes:[
                'userid',
                [Sequelize.fn('SUM', sequelize.col('expenses.amount')),'totalamount']
             ],
             include:[{
                model:User,
                attributes:['id', 'name']
             }],
             group:[ 'expenses.userId'],
             order:[['totalamount', 'DESC']]
          })
          console.log(leaderboard)
          res.status(200).json(leaderboard);
        }

    catch (error) {
        console.log(error);
        throw new Error(error);
    }
}