// import { onRequest } from "firebase-functions/v2/https";
// import { onRequest } from "firebase-functions/v2/https";
// import { logger } from "firebase-functions";
// import { ExpressCheckoutElement } from "@stripe/react-stripe-js";
// import Stripe from "stripe";
/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// const {onRequest} = require("firebase-functions/v2/https");
// const {logger} = require("firebase-functions/logger");
const express=require("express");
const cors = require("cors");
const dotenv=require("dotenv");
dotenv.config();
const stripe=require("stripe")(process.env.STRIPE_KEY);


const app=express();
app.use(cors({origin: true}));

app.use(express.json());

app.get("/", (req, res)=>{
  res.status(200).json({message: "Success!",
  });
});

app.post("/payment/create", async (req, res) =>{
  const total= req.query.total;
  if (total>0) {
    const paymentIntent =await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
    });
    res.status(201).json({
      clientSecret: paymentIntent.client_secret,
    });
  } else {
    res.status(403).json({
      message: "total must be greater than 0",
    });
  }
});

app.listen(5000,(err)=>{
    if(err) throw err
    console.log("Amazon is Running on PORT: 5000,http://localhost:5000");
});