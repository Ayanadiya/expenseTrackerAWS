const path= require('path');
const sequelize=require('../utils/database');

const Expense=require('../models/expenses');
const User=require('../models/User');
const { ECDH } = require('crypto');
const { where } = require('sequelize');


exports.getexpensepage = ((req, res, next) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'expense.html'));
});

exports.getpremiumexpensepage = ((req,res,next) => {
    res.sendFile(path.join(__dirname,'../','views','premiumexpense.html'));
})


exports.postdailyexpense = async (req,res,next) => {
    const t=await sequelize.transaction();
    const amount = req.body.amount;
    const desc = req.body.description;
    const category = req.body.category;
    const userId =req.user.id;

    try{
        const expense = await Expense.create({
            amount:amount,
            description:desc,
            category:category,
            userId:userId
        },{transaction:t})
        const updatedtotalexpense= Number(req.user.totalexpense) +Number(amount);
        await User.update({totalexpense:updatedtotalexpense},{where:{id:userId},transaction:t});
        await t.commit();
        return res.status(200).json(expense);
    }catch(error) {
        await t.rollback();
        console.log(error);
        return res.status(500)
    }   
}

exports.getExpenses = async (req,res,next) => {
    try{
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const offset = (page - 1) * limit;

        const totalExpenses = await Expense.count({ where: { userId: req.user.id } });
        const totalPages = Math.ceil(totalExpenses / limit);

       const expenses=await Expense.findAll({where:{userId:req.user.id},
            limit:limit,
            offset:offset
    });
    res.json({ expenses, totalExpenses, totalPages });
    }
    catch(err) {
        res.json(err);
    }
}


exports.deleteexpense= async (req,res,next) => {
    const t=await sequelize.transaction();
    console.log( "req",req);
    const id=req.params.id;
    try {
        const expense= await Expense.findByPk(id,{transaction:t});
        const result= await expense.destroy({transaction:t});
        const user= await User.findByPk(expense.userId,{transaction:t});
        const updatedtotalexpense= Number(user.totalexpense) -Number(expense.amount);
        await User.update({totalexpense:updatedtotalexpense},{where:{id:expense.userId},transaction:t});
        await t.commit();
        res.status(204).send();
    } catch (error) {
        await t.rollback();
        res.status(500).json(error);
    }
    
}


