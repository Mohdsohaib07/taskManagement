const mongoose = require('mongoose');
const dotenv = require('dotenv');
// dot env config
dotenv.config();
mongodbURL = process.env.URL;
async function dbConnect(){
    try{
        await mongoose.connect(mongodbURL);
        console.log("Database Connected");
    }
    catch(err){
        console.log(err);    
    }
}

exports.dbConnect= dbConnect;