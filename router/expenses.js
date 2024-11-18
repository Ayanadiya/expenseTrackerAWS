const express = require('express');

const router= express.Router();

const expenseController = require('../controller/expenses')

router.get('/', expenseController.getdailyexpensespage);

router.post('/addexpense', expenseController.postdailyexpense);

router.get('/getexpense', expenseController.getExpenses);

router.delete('/delete/:id', expenseController.deleteexpense);

module.exports=router;