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
        return res.status(201);
    })
    .catch(err =>{
        if(err.name==='SequelizeUniqueConstraintError')
        {
            return res.status(400);
        }
        else
        {
            return res.status(500);
        }
    })
})