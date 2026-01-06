const mongoose = require('mongoose');

async function dbConnect(){
    try{
        await mongoose.connect(`mongodb://localhost:27017/tasksDB`);
        console.log("Database Connected");
    }
    catch(err){
        console.log(err);    
    }
}

exports.dbConnect= dbConnect;