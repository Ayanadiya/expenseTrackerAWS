
const Expense=require('../models/expenses');
const User=require('../models/User');
const sequelize = require('../utils/database');
const Sequelize= require('sequelize');

exports.getleaderboard = async (req,res,next) => {
    try {
          const leaderboard= await User.findAll({
            attributes:[
                'name',
                'totalexpense'   
             ],
             order:[['totalexpense', 'DESC']]
          })
          console.log(leaderboard)
          res.status(200).json(leaderboard);
        }

    catch (error) {
        console.log(error);
        throw new Error(error);
    }
}