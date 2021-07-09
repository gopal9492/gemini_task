const usermodel= require('../usermodel/usermodel')
const jwt= require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
require('dotenv').config()

function randomString(len) {
    chars =  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var randomString = '';
    for (var i = 0; i < len; i++) {
        randomString += chars.charAt(Math.random() * chars.length)
    }
    return randomString;
}

//signup
exports.signup = async (req, res) => {
    const input=req.body;
    var response = {
        statusCode: 1,
        statusMessage: "success"
    }
   
    const deviceid=req.body.deviceid || " " ;
    const appid=req.body.appid || " " ;
    const referid=randomString(7);
    const referredby=req.body.referredby || "" ;
    const hashemail=await bcrypt.hashSync(input.email,salt);
    const hashpsw=await  bcrypt.hashSync(input.password, salt);

    const user=await usermodel.findOne({ email: hashemail }).then(user => {
        if (user) {
           
            return res.send("the email is already registerd"+user);
        } 
    })
    input.email=hashemail;
    input.password=hashpsw;
    input.deviceid=deviceid;
    input.appid=appid;
    input.referid=referid;
    input.referredby=referredby
    const newuser=await new usermodel(input)
    await newuser.save().then(data => {
        res.json({
            success :1,
            message: "the data is added"
        })
    
    })
    .catch(err =>{
        res.status(500).send({
            message : err.message || "Some error occurred while creating a create operation"
        });
    });
   
}
//signin

exports.signin =async (req,res)=>{
    var input=req.body;
    const hashemail=await bcrypt.hashSync(input.email,salt);
      usermodel.findOne({ email:hashemail}).then(user => { 
      
        if (!user){
            return res.send("the email id is wrong")
        }
        const isMatch=  bcrypt.compare(input.password,user.password);
       if(!isMatch){
            return res.send("the password is wrong")
         }
         
        else {
            let accessToken=jwt.sign(input,process.env.ACCESS_TOKEN_KEY,{algorithm: "HS256",expiresIn:'60s'});
            return res.status(201).json({accessToken});
        }  
   })
}

exports.isAuth=function isAuthenticated(req, res, next) {
    if (typeof req.headers.authorization !== "undefined") {
        let token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_KEY, { algorithm: "HS256" }, (err, user) => {
            if (err) {  
                res.status(500).json({ error: "Not Authorized" });
                throw new Error("Not Authorized");
            }
            return res.send(user);
        });
    } else {
        res.status(500).json({ error: "Not Authorized" });
        throw new Error("Not Authorized");
    }
}
exports.secret=(req,res)=>{
    res.json({ "message" : "THIS IS SUPER SECRET, DO NOT SHARE!" })
}
//getting who used my referid that persons details
exports.referid=(req,res)=>{
    usermodel.findById(req.params.id,function(error,users){
        if(error){
            res.json({
                success :0,
                message: "The id is wrong"
            })
        }
        else{
          //console.log(users.referid);
            usermodel.aggregate([
                {$match: {referredby :users.referid}},
                {$project:{firstname:1}}
            ]).exec(function (err,data){
                if(err) throw err;
                else res.send(data)
            })
            
        }
    })
    
}

//which person referid i used

exports.referredBy=(req,res)=>{
    usermodel.findById(req.params.id,function(err,users){
        if(err){
            res.json({
                success :0,
                message: "The id is wrong"
            })
        }
        else{
            //res.send("The refer person refer id is "+users.referredby);
            usermodel.aggregate([{
                $match :{ referid : users.referredby}},{ $project:{firstname:1}
            }]).exec(function (err,data){
                if(err) throw err;
                else res.send(data)
            })
        }
    })
}