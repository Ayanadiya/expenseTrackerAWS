const express= require('express');

const router=express.Router();

const passwordController=require('../controller/password');

router.get('/', passwordController.getForm);

router.post('/forgotpassword', passwordController.getPassword);

module.exports=router;