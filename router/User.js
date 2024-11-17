const express= require('express');

const userController= require('../controller/User');

const router = express.Router();

router.post('/signup', userController.postSignUp);

router.post('/login', userController.postlogin);

module.exports=router;