
const mongoose = require('mongoose')
const strategy =require("passport-facebook");
const FacebookStrategy = strategy.Strategy;
const User = require('../usermodel/usermodel')
require('dotenv').config()
var ip = require('ip');

function randomString(len) {
  chars =  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var randomString = '';
  for (var i = 0; i < len; i++) {
      randomString += chars.charAt(Math.random() * chars.length)
  }
  return randomString;
}
module.exports = function (passport) {
    passport.use(
        new FacebookStrategy(
          {
            clientID: '2650146231953837',
            clientSecret:'7485a2eb6866507b055368bf884142c8',
            callbackURL: 'http://localhost:5000/api/user/auth/facebook/callback',
        
          },
          async(accessToken, refreshToken, profile, done)=> {
            console.log(profile)
            const newUser = {
                uId: profile.id,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          email: profile.emails[0].value,
          referid:randomString(7),
          deviceid:ip.address()
        }
        try {
            //find the user in our database 
            let user = await User.findOne({ uId: profile.id })
  
            if (user) {
              //If user present in our database.
              console.log(user)
              done(null, user)
            } else {
              // if user is not preset in our database save user data to database.
              console.log(user)
              user = await User.create(newUser)
              done(null, user)
            }
          } catch (err) {
            console.error(err)
          }
            
          }
        )
      )
      passport.serializeUser((user, done) => {
        done(null, user.id)
      })
    
      
      passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => done(err, user))
      })
    };


