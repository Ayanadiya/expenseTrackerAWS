const express = require('express');
const bodyParser= require('body-parser');
const path=require('path');
const cors=require('cors');
const helmet=require('helmet');
const compression=require('compression');
const morgan=require('morgan');
const fs=require('fs');

const sequelise= require('./utils/database');

const User= require('./models/User');
const Expense= require('./models/expenses');
const Order=require('./models/order');
const Forgotpassword=require('./models/forgotpasword');
const Download=require('./models/downloads');

const userRouter=require('./router/User');
const expenseRouter=require('./router/expenses');
const purchaseRouter=require('./router/purchase');
const premiumRouter=require('./router/premium');
const passwordRouter=require('./router/password');

const accessLogStream=fs.createWriteStream(
    path.join(__dirname,'access.log'),
    {flags:'a'}
);

const app=express();

app.use(helmet());
app.use(compression());
app.use(morgan('combined', {stream:accessLogStream}));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use('/Domjs', express.static(path.join(__dirname, 'Domjs')));
app.use(express.static(path.join(__dirname,'views')));

app.use('/user', userRouter);
app.use('/expense', expenseRouter);
app.use('/purchase', purchaseRouter);
app.use('/premium', premiumRouter);
app.use('/password', passwordRouter);


app.use('/',(req,res) =>{res.sendFile(path.join(__dirname,'views','login.html'))} );

User.hasMany(Expense);
Expense.belongsTo(User);
User.hasMany(Order);
Order.belongsTo(User);
User.hasMany(Forgotpassword);
Forgotpassword.belongsTo(User);
User.hasMany(Download);
Download.belongsTo(User);

sequelise.sync()
.then(result => {
    console.log('database ready');
    app.listen(3000);
})
.catch(err => console.log(err));