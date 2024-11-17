const { where } = require('sequelize');
const User=require('../models/User');

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
                res.status(200).json({message: 'Login Successsfull'})
            }
            res.json({message:"Incorrect password"})
        }
        res.json({message:'User not found'})
    })
    .catch(err => console.log(err));
})