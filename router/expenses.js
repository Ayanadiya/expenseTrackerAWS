const express = require('express');

const router= express.Router();

const expenseController = require('../controller/expenses');
const authenticate = require('../middleware/authentication');

router.get('/', expenseController.getdailyexpensespage);

router.post('/addexpense', expenseController.postdailyexpense);

router.get('/getexpense',authenticate.authenticate, expenseController.getExpenses);

router.delete('/delete/:id', expenseController.deleteexpense);

module.exports=router;