const Leaderboard=require('../models/leaderboard');
const Expense=require('../models/expenses');
const User=require('../models/User');

exports.getleaderboard = async (req,res,next) => {
    try {
          const users= await User.findAll();
          const expenses= await Expense.findAll();
          const totalexpensebyuserid={};
          for(expense of expenses)
          {
            if(expense.userId in totalexpensebyuserid)
            {
                totalexpensebyuserid[expense.userId]= totalexpensebyuserid[expense.userId]+expense.amount;
            }
            else
            {
                totalexpensebyuserid[expense.userId]= expense.amount;

            }
          }
          const leaderboard1=[];
          for(user of users)
          {
                leaderboard1.push({name:user.name, total:totalexpensebyuserid[user.id] || 0})
          }
          leaderboard1.sort((a,b) => b.total-a.total);
          console.log(leaderboard1)
          res.status(200).json(leaderboard1);
        }

    catch (error) {
        console.log(err);
        throw new Error(error);
    }
}