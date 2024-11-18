const path= require('path');

const Expense=require('../models/expenses');
const { ECDH } = require('crypto');

exports.getdailyexpensespage = ((req, res, next) => {
    res.sendFile(path.join(__dirname, '../', 'views', 'dailyexpense.html'));
});

exports.postdailyexpense = async (req,res,next) => {
    const amount = req.body.amount;
    const desc = req.body.description;
    const category = req.body.category;

    try{
        const expense = await Expense.create({
            amount:amount,
            description:desc,
            category:category
        })
        return res.status(200).json({message:'Expense added'});
    }catch(error) {
        console.log(error);
        return res.status(500)
    }   
}

exports.deleteexpense= async (req,res,next) => {
    const id=req.params.id;
    const expense=findByPk(id);
    
}