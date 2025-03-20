import userModel from "../models/userModel.js";
import bcrypt from"bcrypt"
import jwt from'jsonwebtoken'
//import Stripe from "stripe"
//import transactionModel from "../models/transactionModel.js";
export const registerUser =async(req,res)=>
{
    try{
         const {name,email,password} =req.body;

         if(!name ||!email ||!password)
         {
            return res.json(
                {
                    success:false,
                    message :'Missing Details'
                }
            )
         }
         const salt = await bcrypt.genSalt(10)
         const hashedPassword= await bcrypt.hash(password,salt)
         const userData={
            name,
            email,
            password:hashedPassword
         }
         const newUser = new userModel(userData)
         const user =await newUser.save()

         const token = jwt.sign({id:user._id},process.env.JWT_SECRET)
          res.json({success:true,token,user:{name:user.name}})
    }
    catch(error)
    {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}
 export const loginUser = async(req,res)=>
 {
    try{

        const {email,password} =req.body;
        const user = await userModel.findOne({email})
        if (!email || !password) {

            return res.json
            ({ success: false, 
               message: "Email and password are required"
             });
        }
        if(!user)
        {
            return res.json({
                success:false,
                message:'User does not exist'
            })
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(isMatch)
        {
            const token = jwt.sign({id:user._id},process.env.JWT_SECRET)

            res.json({success:true,token,user:{name:user.name}})
        }
        else
        {
            return res.json({
                success:false,
                message:'Invalid credentials'
            })
        }
    }
    catch(error)
    {
        console.log(error)
        res.json({success:false,message:error.message})
    }
    }
 export const userCredits =async(req,res)=>
 {
   try
   {
      const{userId}= req.body
      const user =await userModel.findById(userId)
      res.json({success:true,credits:user.creditBalance,user:{name:user.name}})

   }
   catch(error)
   {
         console.log(error.message)
         res.json(
            {
                success:false,
                message:error.message
            }
         )
   }
 }
// const stripeInstance = new Stripe(process.env.STRIPE_KEY_SECRET);
    

// export const paymentStipe =async(req,res)=>
// {
//     try{
//        const {userId,planId} =req.body
//        const userData =await userModel.findById(userId)
//        if(!userId || !planId)
//        {
//          return res.json(
//             {
//                 success:false,
//                 message:'Missing Details'
//             }
//         )
//        }
//        let credits,plan,amount,date
//        switch(planId)
//        {
//         case 'Basic':
//             plan ='Basic'
//             credits=100
//             amount=10
//             break;
//         case 'Advanced':
//              plan ='Advanced'
//              credits =500
//              amount=50
//              break;
//         case 'Advanced':
//             plan ='Advanced'
//             credits =5000
//             amount=250
//             break;
//         default:
//             return res.json({
//                 success :false,
//                 message:'plan not found'
//             });
                
//        }
       
//        const transactionData={
//         userId, plan,amount,credits,date:new Date(),
//        }
//        const newTransaction =await transactionModel.create(transactionData)

//        // Create a Stripe Payment Intent
//        const paymentIntent = await stripeInstance.paymentIntents.create({
//         amount: amount * 100, // Convert to cents
//         currency: process.env.CURRENCY || "USD",
//         metadata: { transactionId: newTransaction._id.toString() },
//     });

//     // Send response with client secret
//     res.json({
//         success: true,
//         clientSecret: paymentIntent.client_secret,
//         transactionId: newTransaction._id,
//     });

// } catch (error) {
//     console.error(error);
//     res.status(500).json({
//         success: false,
//         message: error.message,
//     });
// }
// };// Webhook for Stripe to notify payment success
// export const stripeWebhook = async (req, res) => {
//     const sig = req.headers["stripe-signature"];

//     try {
//         const event = stripe.webhooks.constructEvent(
//             req.rawBody,
//             sig,
//             process.env.STRIPE_WEBHOOK_SECRET
//         );

//         if (event.type === "payment_intent.succeeded") {
//             const paymentIntent = event.data.object;
//             const transactionId = paymentIntent.metadata.transactionId;

//             await transactionModel.findByIdAndUpdate(transactionId, { payment: true });

//             console.log("Payment successful for transaction:", transactionId);
//         }

//         res.status(200).json({ received: true });
//     } catch (err) {
//         console.error("Webhook error:", err.message);
//         res.status(400).json({ error: err.message });
//     }
// };