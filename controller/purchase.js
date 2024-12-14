const Razorpay = require('razorpay');
const Order = require('../models/order');
const User= require('../models/User');
const { where } = require('sequelize');

require('dotenv').config();
const id=process.env.RAZORPAY_KEY;
const secret=process.env.RAZORPAY_KEYSECRET;

exports.purchasePremium = async (req,res) => {
    try {
        console.log('creating rzp');
        var rzp= new Razorpay({
            key_id:id,
            key_secret:secret
        })
        const amount=50.00*100;
        console.log("amount added");
        rzp.orders.create({amount, currency:"INR"}, (err, order) => {
            if(err)
            {
                console.log(JSON.stringify(err));
                throw new Error(JSON.stringify(err));
            }
            req.user.createOrder({orderid:order.id, status:"Pending",})
            .then(()=>{
                console.log("sending order and keyid");
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
        console.log('request recieved on updatestatus');
        const {payment_id, order_id,status} = req.body
        const order = await Order.findOne({where:{orderid:order_id}});
        if(status==='failed')
        {
            order.paymentid=payment_id;
            order.status='failed;'
        }else if(status="success"){
            order.paymentid=payment_id;
            order.status='Successful'
            const user= await User.findOne({where:{id:order.userId}})
            user.isPremiumuser="true";
            await user.save();
        }
        await order.save();
        
        return res.status(202).json({success:true, message:status === 'failed' ? 'Payment failed' :"Transaction Successfull"})
    } catch (error) {
        console.log(error);
        res.status(403).json({error:error, message:'Something went wrong'});
    }
}

