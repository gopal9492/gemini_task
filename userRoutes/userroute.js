const express=require('express');
const route=express.Router();
const {signupvalidate,signinvalidate}=require('../validations/validation');
const  Router =require('../usercontroller/userController')
const rateLimit = require("express-rate-limit");
const { RateLimiterMemory } = require('rate-limiter-flexible');

const apiLimiter = rateLimit({
    windowMs: 3 * 60 * 1000, 
    max: 0,
    message: "Too many time your logined, please try again after 3 mins"
  });
 
  const rateLimiter = new RateLimiterMemory(
  {

    points: 3,
    duration: 300, 
    blockDuration: 3*60 * 60,
  });
  
  const rateLimiterMiddleware = (req, res, next) => {
    const emailID = req.body.email;
    rateLimiter.consume(emailID) // or req.ip
      .then(() => {
        next();
      })
      .catch((rejRes) => {
        apiLimiter
        res.status(429).send('too many request your account paused wait 3 mins it will open');
        
      });
  };

route.post('/signup',signupvalidate,Router.signup);
route.post('/signin',rateLimiterMiddleware,Router.signin);
route.get('/referby/:id',Router.referredBy);
route.get('/referid/:id',Router.referid);
route.post('/secret',apiLimiter,Router.isAuth);
route.post('/createpwd/:email',Router.createPassword);




module.exports=route;