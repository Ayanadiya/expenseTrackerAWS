const express = require('express');
const bodyParser= require('body-parser');
const path=require('path');

const sequelise= require('./utils/database');

const userRouter=require('./router/User');

const app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'views')));
app.use('/Domjs', express.static(path.join(__dirname, 'Domjs')));

app.use('/user', userRouter);

app.use('/',(req,res) =>{res.sendFile(path.join(__dirname,'views','login.html'))} );
sequelise.sync()
.then(result => {
    console.log('database ready');
    app.listen(3000);
})
.catch(err => console.log(err));