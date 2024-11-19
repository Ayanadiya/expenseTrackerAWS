const path= require('path');

const Expense=require('../models/expenses');
const { ECDH } = require('crypto');

exports.getdailyexpensespage = ((req, res, next) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'dailyexpense.html'));
});

exports.postdailyexpense = async (req,res,next) => {
    console.log(req);
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
        })
        return res.status(200).json(expense);
    }catch(error) {
        console.log(error);
        return res.status(500)
    }   
}

exports.getExpenses = async (req,res,next) => {
    try{
       const expenses=await Expense.findAll({where:{userId:req.user.id}});
       res.json(expenses);
    }
    catch(err) {
        res.json(err);
    }
}

exports.deleteexpense= async (req,res,next) => {
    const id=req.params.id;
    try {
        const expense= await Expense.findByPk(id);
        const result= await expense.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json(error);
    }
    
}