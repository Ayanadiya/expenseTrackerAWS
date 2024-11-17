const { where } = require('sequelize');
const User=require('../models/User');
const path=require('path');

exports.postSignUp = ((req,res, next) =>{
    const name=req.body.name;
    const email=req.body.email;
    const password=req.body.password;
    User.create({
        name:name,
        email:email,
        password:password
    }).then(result => {
        console.log(result);
        return res.status(201);
    })
    .catch(err =>{
        if(err.name==='SequelizeUniqueConstraintError')
        { 
            return res.status(400).json({ message: 'This email is already registered.' });
        }
        console.log(err);
        return res.status(500);
    })
})

exports.postlogin =((req,res,next) => {
    const email=req.body.email;
    const password=req.body.password;
    User.findOne({where:{email:email}})
    .then(user => {
        if(user)
        {
            if(user.password===password)
            {
               return res.status(200).json({message: 'Login Successsfull'});
            }
            return res.status(401).json({message:"User not authorized"});
        }
        res.status(404).json({message:'User not found'});
    })
    .catch(err => console.log(err));
})

exports.getsignup = ((req, res, next) => {
    res.sendFile(path.join(__dirname,'../','views','signup.html'));
})