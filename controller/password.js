const path=require('path');
const Sib = require('sib-api-v3-sdk'); //sedinblue class

require('dotenv').config();


exports.getPassword = async (req,res,next) => {
    try {
        const client=Sib.ApiClient.instance;
        const apiKey = client.authentications['api-key'];
        apiKey.apiKey=process.env.API_KEY
        const tranEmailApi=new Sib.TransactionalEmailsApi();
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
            textContent:`Hi user your password is 1545ah`
        })
        res.status(200).json('Password sent to your email');
    } catch (error) {
        console.log(error)
    }
}

exports.getForm = async (req,res,next) => {
    res.sendFile(path.join(__dirname,'../','views','password.html'));
}