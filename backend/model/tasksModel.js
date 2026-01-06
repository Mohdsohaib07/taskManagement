const mongoose = require('mongoose');

const {Schema} = mongoose;

const tasksSchema = new Schema({
    title:{type:String,required:true},
    description:{type:String},
    status:{type:String,enum:["pending","completed"],default:"pending"}
},{
    timestamps:true
}
);

const Task = mongoose.model("Task",tasksSchema);

exports.Task=Task;