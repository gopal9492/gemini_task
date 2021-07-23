const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
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
module.exports = function (passport,req,res) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:5000/api/user/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        //get the user data from google 
       
        const newUser = {
          uId: profile.id,
          firstname: profile.name.givenName,
          lastname: profile.name.familyName,
          email: profile.emails[0].value,
          referid:randomString(7),
          deviceid:ip.address()
        }

        try {
          //find the user in our database 
          let user = await User.findOne({ uId: profile.id })

          if (user) {
            //If user present in our database.
            return done(null,user)
           
          } else {
            console.log(newUser)
            // if user is not preset in our database save user data to database.
            user = await User.create(newUser)
            return done(null,user);
          }
        } catch (err) {
          console.error(err)
        }
      }
    )
  )

  // used to serialize the user for the session
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  // used to deserialize the user
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user))
  })
} 