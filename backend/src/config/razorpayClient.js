const Razorpay = require('razorpay');

const apiKey = process.env.RAZORPAY_API_KEY || "your_api_key_here";
const apiSecret = process.env.RAZORPAY_API_SECRET || "your_api_secret_here";


const razorpay = new Razorpay({
    key_id: apiKey,
    key_secret: apiSecret,
  });


  module.exports = razorpay;