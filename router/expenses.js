const express = require('express');

const router= express.Router();

const expenseController = require('../controller/expenses')

router.get('/', expenseController.getdailyexpensespage);

module.exports=router;