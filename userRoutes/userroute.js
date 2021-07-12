const express=require('express');
const route=express.Router();
const {signupvalidate,signinvalidate}=require('../validations/validation');
const  Router =require('../usercontroller/userController')
const rateLimit = require("express-rate-limit");

const apiLimiter = rateLimit({
    windowMs: 30 * 60 * 1000, 
    max: 30,
    message: "Too many time your logined, please try again after 30 mins"
  });


route.post('/signup',signupvalidate,Router.signup);
route.post('/signin',signinvalidate,Router.signin);
route.get('/referby/:id',Router.referredBy);
route.get('/referid/:id',Router.referid);
route.post('/secret',apiLimiter,Router.isAuth);

module.exports=route;