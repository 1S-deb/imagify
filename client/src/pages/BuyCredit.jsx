import React, { useContext } from 'react'
import { assets, plans } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import {motion} from 'framer-motion'
import { loadStripe } from '@stripe/stripe-js';
// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY); // Load Stripe
 const BuyCredit = () => {
  const {user} = useContext(AppContext)
//   const handlePurchase = async (plan) => {
//     if (!user) {
//       alert("Please log in to make a purchase.");
//       return;
//     }
//        const token = localStorage.getItem('token'); // Retrieve the token

//   if (!token) {
//     alert('You are not logged in.');
//     return;
//   }
//     try {
//       const stripe = await stripePromise;
      
//       const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/paymentStripe`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${user.token}` },
//         body: JSON.stringify({
//           userId: user.id,
//           plan: plan.id,
//           amount: plan.price,
//           credits: plan.credits
//         })
//       });

//       const session = await response.json();

//       if (!session.success) {
//         alert("Payment failed: " + session.message);
//         return;
//       }

//       // Redirect user to Stripe Checkout
//       const result = await stripe.redirectToCheckout({ sessionId: session.sessionId });

//       if (result.error) {
//         console.error(result.error);
//       }
      
//     } catch (error) {
//   console.error("Stripe payment error:", error);
//   alert("An error occurred while processing your payment. Please try again later.");
// }
//   };

  return (
    <motion.div
    initial ={{opacity:0.2,y:100}}
    transition={{duration:1}}
    whileInView={{opacity:1,y:0}}
    viewport ={{once :true}} 
    
    
    
    className='min-h-[80vh] text-center pt-14 mb-10'>
      <button className='border border-gray-400 px-10 py-2 rounded-full mb-6'>Our Plans</button>
      <h1 className='text-center text-3xl font-medium mb-6 sm:mb-10'>Choose the plan</h1>

      <div className='flex flex-wrap justify-center gap-6 text-left'>
        {plans.map((item,index)=>(
           <div key={index} className='bg-white drop-shadow-sm border rounded-lg py-12 px-8 text-gray-600 hover:scale-105 transition-all duration-500'>
             <img width={40} src={assets.logo_icon}alt=""/>
             <p className='mt-3 mb-1 font-semibold'>{item.id}</p>
             <p className='text-sm'>{item.desc}</p>
             <p className='mt-6'><span className='text-3xl font-medium'>${item.price} </span>/ {item.credits} credits</p>
             <button
              className='w-full bg-gray-800 text-white mt-8 text-sm rounded-md py-2.5 min-w-52'
              onClick={() => handlePurchase(item)}  // Pass the plan data to handlePurchase
            >
              {user ? 'Purchase' : 'Get Started'}
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

          

export default BuyCredit
