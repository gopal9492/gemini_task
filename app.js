const express = require('express');
const app = express();
require('dotenv').config()
app.use(express.json())
require('./mongodb/dbconfig');



app.use('/api/user',require('./userRoutes/userroute'));
const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Server Up in Port ${port}`);
})