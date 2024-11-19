const jwt= require('jsonwebtoken');
const User= require('../models/User');

const secretkey="mydata";

const authenticate = (req,res,next) => {
    try {
        const token=req.header('Authorization')?.replace('Bearer ', '');
        console.log(token);
        const user=jwt.verify(token,secretkey);
        const userId=user.userId;
        console.log(userId)
        User.findByPk(userId)
        .then(user => {
            console.log(JSON.stringify(user));
            req.user=user;
            next();
        }).catch(err => { throw new Error(err)});
    } catch (error) {
        console.log(error);
        return res.status(401).json({success:'false'});
    }
}

module.exports ={ authenticate };