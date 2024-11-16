const express= require('express');

const userController= require('../controller/User');

const router = express.Router();

router.post('/signup', userController.postSignUp)

module.exports=router;