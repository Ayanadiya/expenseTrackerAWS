const { where } = require('sequelize');
const User=require('../models/User');
const path=require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltrounds=10;

const secretkey='mydata';

function generateAccesstoken(id,name) {
    return jwt.sign({userId:id, name:name}, secretkey);
}

exports.postSignUp = async(req,res, next) =>{
    const name=req.body.name;
    const email=req.body.email;
    const password=req.body.password;
    try{
        const hashpassword= await bcrypt.hash(password,saltrounds);
        const user= await User.create({
            name:name,
            email:email,
            password:hashpassword
        })
            console.log(user);
            return res.status(201).json({message:"User account created"});
    }
    catch(err) {
        if(err.name==='SequelizeUniqueConstraintError')
        { 
            return res.status(400).json({ message: 'This email is already registered.' });
        }
        console.log(err);
        return res.status(500);
    }
}

exports.postlogin =async(req,res,next) => {
    const email=req.body.email;
    const password=req.body.password;
    try{
        const user= await User.findOne({where:{email:email}})
        if(user)
            {
                const isMatch= await bcrypt.compare(password,user.password)
                if(isMatch)
                {
                    return res.status(200).json({message:'User login successfully', token:generateAccesstoken(user.id,user.name)});
                }
                else
                {
                 res.status(401).json({message:"User not authorized"})
                }
            }    
            res.status(404).json({message:'User not found'});
    } catch(err) {
        res.status(500).json(err);
    }
}

exports.getsignup = ((req, res, next) => {
    res.sendFile(path.join(__dirname,'../','views','signup.html'));
})