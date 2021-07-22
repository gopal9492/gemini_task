const express = require('express');
const app = express();
require('dotenv').config()
app.use(express.json())
require('./mongodb/dbconfig');
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongodb-session')(session)
require('./oauth/passport')(passport)
require('./oauth/facebook')(passport)

app.use(passport.initialize())

app.use('/api/user/auth', require('./userRoutes/auth'))
app.use('/api/user',require('./userRoutes/userroute'));
const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Server Up in Port ${port}`);
})