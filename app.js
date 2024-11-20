const express = require('express');
const bodyParser= require('body-parser');
const path=require('path');
const cors=require('cors');

const sequelise= require('./utils/database');

const User= require('./models/User');
const Expense= require('./models/expenses');
const Order=require('./models/order');
const Leaderboard=require('./models/leaderboard');

const userRouter=require('./router/User');
const expenseRouter=require('./router/expenses');
const purchaseRouter=require('./router/purchase');
const premiumRouter=require('./router/premium');

const app=express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use('/Domjs', express.static(path.join(__dirname, 'Domjs')));
app.use(express.static(path.join(__dirname,'views')));

app.use('/user', userRouter);
app.use('/expense', expenseRouter);
app.use('/purchase', purchaseRouter);
app.use('/premium', premiumRouter);

app.use('/',(req,res) =>{res.sendFile(path.join(__dirname,'views','login.html'))} );

User.hasMany(Expense);
Expense.belongsTo(User);
User.hasMany(Order);
Order.belongsTo(User);
User.hasOne(Leaderboard);
Leaderboard.belongsTo(User);

sequelise.sync()
.then(result => {
    console.log('database ready');
    app.listen(3000);
})
.catch(err => console.log(err));