const express=require('express');

const router=express.Router();

const premiumController=require('../controller/premium');

router.get('/leaderboard', premiumController.getleaderboard);

module.exports=router;