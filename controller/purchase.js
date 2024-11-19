const Razorpay = require('razorpay');
const Order = require('../models/order');
const User= require('../models/User');


exports.purchasePremium = async (req,res) => {
    try {
        var rzp= new Razorpay({
            key_id:process.env.RazorKey_Id,
            key_secret:process.env.RazorKeySecret
        })
        const amount=50.00*100;
        rzp.orders.create({amount,currency:"INR"}, (err, order) => {
            if(err)
            {
                throw new Error(JSON.stringify(err));
            }
            req.user.createOrder({orderid:order.id, status:"Pending",})
            .then(()=>{
                return res.status(201).json({order, key_id:rzp.key_id});
            })
            .catch(err => {throw new Error(err)})
        })
    } catch (error) {
        console.log(error);
        res.status(401).json({message:'Something went wrong', err:error});
    }
}

exports.updateTransactionStatus = async (req,res) => {
    try {
        const {payment_id, order_id} = req.body
        const order = await Order.findOne({where:{orderid:order_id}});
        const updateuser= await order.User.update({isPremiumuser:true});
        return res.status(202).json({success:true, message:"Transaction Successfull"})
    } catch (error) {
        throw new Error(error);
    }
}

