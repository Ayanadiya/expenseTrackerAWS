const express = require('express');
const bodyParser= require('body-parser');
const path=require('path');

const userRouter=require('./router/User');

const app=express();

app.use(express.static(path.join(__dirname,'views')));

app.use('/user', userRouter);

app.listen(3000);