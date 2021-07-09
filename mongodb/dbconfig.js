const mongoose = require("mongoose");
const url = 'mongodb+srv://gopal949222:pchumKB7GeQYckMT@cluster0.4sqcx.mongodb.net/task?retryWrites=true&w=majority';

  mongoose.connect(url, {useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex:true})
 .then((result) => console.log("db is connected"))
 .catch((err) => console.log(err));