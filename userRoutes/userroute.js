const express=require('express');
const route=express.Router();
const {signupvalidate,signinvalidate}=require('../validations/validation');
const  Router =require('../usercontroller/userController')
const rateLimit = require("express-rate-limit");
const { RateLimiterMemory } = require('rate-limiter-flexible');

const apiLimiter = rateLimit({
    windowMs: 3 * 60 * 1000, 
    max: 3,
    message: "Too many time your logined, please try again after 3 mins"
  });
 
  const rateLimiter = new RateLimiterMemory(
  {
    points: 2,
    duration: 60, 
  });
  
  const rateLimiterMiddleware = (req, res, next) => {
    const emailID = req.body.email;
    rateLimiter.consume(emailID) // or req.ip
      .then(() => {
        next();
      })
      .catch((rejRes) => {
        res.status(429).send('too many request wait 1 mins');
      });
  };

route.post('/signup',signupvalidate,Router.signup);
route.post('/signin',rateLimiterMiddleware,Router.signin);
route.get('/referby/:id',Router.referredBy);
route.get('/referid/:id',Router.referid);
route.post('/secret',apiLimiter,Router.isAuth);





module.exports=route;