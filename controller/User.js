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
    })
    .catch(err => console.log(err))
})