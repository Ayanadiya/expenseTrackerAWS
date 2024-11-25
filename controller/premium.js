
const Expense=require('../models/expenses');
const User=require('../models/User');
const Download=require('../models/downloads');
const sequelize = require('../utils/database');
const Sequelize= require('sequelize');
const AWS= require('aws-sdk');

require('dotenv').config();


exports.getleaderboard = async (req,res,next) => {
    try {
          const leaderboard= await User.findAll({
            attributes:[
                'name',
                'totalexpense'   
             ],
             order:[['totalexpense', 'DESC']]
          })
          console.log(leaderboard)
          res.status(200).json(leaderboard);
        }

    catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

exports.getDownload= async (req,res,next) => {
    try {
        if(req.user.isPremiumuser===false)
        {
            return res.status(401).json({message:'Not a premium user'});
        }
        const id=req.user.id;
        const expenses= await Expense.findAll({where:{userId:id}});
        const stringifyexpenses= JSON.stringify(expenses);
        const Filename=`expenses${id}/${new Date()}.txt`;
        const fileURL= await uploadtoS3(stringifyexpenses,Filename);
        await Download.create({links:fileURL, userId:id});
        console.log(fileURL);
        res.status(200).json({fileURL,success:true});

    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

function uploadtoS3(data,filename) {
    const BUCKET_NAME=process.env.BUCKET_NAME
    const IAM_USER_KEY=process.env.IAM_USER_KEY
    const IAM_USER_SECRET=process.env.IAM_USER_SECRET

    let s3bucket = new AWS.S3({
        accessKeyId:IAM_USER_KEY,
        secretAccessKey:IAM_USER_SECRET
    })
    var params= {
        Bucket:BUCKET_NAME,
        Key:filename,
        Body:data,
        ACL:'public-read',
        ContentType: 'text/plain',
        ContentDisposition: 'attachment; filename="' + filename + '"'
    }
    return new Promise((resolve, reject) => {
        s3bucket.upload(params, (err, s3response) => {
            if (err) {
                reject(err);  // Reject the promise if there's an error
            } else {
                resolve(s3response.Location);  // Resolve the promise with the file URL
            }
        });
    });
}

exports.getdownloadedfiles = async (req,res,next) => {
    try {
        console.log('reached backend');
        const id =req.user.id;
        const downloads=await Download.findAll({where:{userId:id}});
        console.log(downloads);
        res.status(200).json(downloads);
    } catch (error) {
        console.log(error);
        res.status(500).json('Something went wrong', {error:error});
    }
}