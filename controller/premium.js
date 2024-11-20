const Leaderboard=require('../models/leaderboard');

exports.getleaderboard = async (req,res,next) => {
    try {
          const leaderboard= await Leaderboard.findAll();
          console.log(leaderboard);
        }

    catch (error) {
        console.log(err);
        throw new Error(error);
    }
}