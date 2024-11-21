
const Expense=require('../models/expenses');
const User=require('../models/User');
const sequelize = require('../utils/database');
const Sequelize= require('sequelize');

exports.getleaderboard = async (req,res,next) => {
    try {
          const leaderboard= await User.findAll({
            attributes:[
                'id',
                'name',
                [Sequelize.fn('SUM', sequelize.col('expenses.amount')),'totalamount']
             ],
             include:[{
                model:Expense,
                attributes:[]
             }],
             group:[ 'users.id'],
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