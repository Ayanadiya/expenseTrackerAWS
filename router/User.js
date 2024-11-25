const express= require('express');

const userController= require('../controller/User');

const router = express.Router();

router.post('/signup', userController.postSignUp);

router.post('/login', userController.postlogin);

router.get('/getSignup', userController.getsignup);


module.exports=router;