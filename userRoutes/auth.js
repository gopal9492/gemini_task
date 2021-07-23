//Importing required modules 
const express = require('express')
const passport = require('passport')
const router = express.Router()


router.get('/google', passport.authenticate('google', { scope: ['profile','email'] }))


router.get(
  '/google/callback',
  passport.authenticate('google',{ failureRedirect: '/error' }),
  function(req, res) {
    res.send("welcome to dashboard");
  });

router.get("/facebook", passport.authenticate("facebook",{ scope: ['profile','email'] }));

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "/fail"
  }),(req, res) => {
    res.json({message: "data added. through google"})
  }
);
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});
 
  module.exports = router