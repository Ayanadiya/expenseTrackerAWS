const path=require('path')
const Sib = require('sib-api-v3-sdk'); //sedinblue class
const uuid = require('uuid');

const User=require('../models/User');
const Forgotpassword=require('../models/forgotpasword');
const { where } = require('sequelize');
const bcrypt = require('bcrypt');

const saltrounds=10;

require('dotenv').config();

exports.getPassword = async (req,res,next) => {
    try {
        const { email } =  req.body;
        const user = await User.findOne({where : { email }});
        const id = uuid.v4();
        await user.createForgotpassword({ id , active: true })
        const client=Sib.ApiClient.instance;
        const apiKey = client.authentications['api-key'];
        apiKey.apiKey=process.env.API_KEY
        const tranEmailApi= await new Sib.TransactionalEmailsApi();
        const sender={
            email:'ayanadiya17@gmail.com'
        }
        const reciever=[
            {
                email:req.body.email
            }
        ]
        await tranEmailApi.sendTransacEmail({
            sender,
            to:reciever,
            subject:'Expense Tracker - Get Your Password',
            textContent:`Hi user this email is to reset your account password`,
            htmlContent: `<a href="http://localhost:3000/password/resetpassword/${encodeURIComponent(id)}">Reset password</a>`

        })
        res.status(200).json({message:'Password sent to your email'});
    } catch (error) {
        console.log(error)
    }
}

exports.getForm = async (req,res,next) => {
    res.sendFile(path.join(__dirname,'../','views','password.html'));
}

exports.resetPassword = async (req,res,next) => {
    const id=req.params.id;
    const request= await Forgotpassword.findOne({where:{id:id}});
    if(request.active===true)
    {
        await request.update({active:false});
        res.status(200).sendFile(path.join(__dirname,'../','views', 'newpassword.html'));
    }
}

exports.updatePassword = async (req,res,next) => {
    try {
        const email=req.body.email;
        const password=req.body.newpassword;
        const user= await User.findOne({where:{email:email}});
        const hashpassword= await bcrypt.hash(password,saltrounds);
        await user.update({password:hashpassword});
        res.status(201).json({message: 'Successfuly update the new password'})
    } catch (error) {
        throw new Error(error);
    }
    
}