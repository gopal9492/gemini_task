const express=require('express');
const route=express.Router();
const {signupvalidate,signinvalidate}=require('../validations/validation');
const  Router =require('../usercontroller/userController')



route.post('/signup',signupvalidate,Router.signup);
route.post('/signin',signinvalidate,Router.signin);
route.get('/referby/:id',Router.referredBy);
route.get('/referid/:id',Router.referid);
route.post('/secret',Router.isAuth);

module.exports=route;