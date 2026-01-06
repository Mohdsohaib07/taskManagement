const {Task}= require('../model/tasksModel.js');
//GET
exports.getAllTasks= async function(req,res){
    try{
        const task = await Task.find();
        res.status(200).json(task);
    }
    catch(error){
        console.log(error.message);
        res.status(500).send(error.message);
        
    }
}
//POST
exports.addTask= async function(req,res){
    try {
       console.log(req.body);
       let task = new Task();
       task.title=req.body.title;
       task.description=req.body.description;
       await task.save();
       console.log("new Task Added");
       res.status(201).json({message:'added Successfully'});
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message); 
    }

}
//PATCH
exports.updateTask= async function(req,res){
    try{
        await Task.findOneAndUpdate({_id:req.params.id},{$set:req.body},{new:true,upsert:false,runValidators:true});
        res.status(200).json({message:'updated successfully'});

    }
    catch(error){
        console.log(error.message);
        res.status(500).send(error.message);
    }
}
//DELETE
exports.deleteTask= async function(req,res){
    try{
        await Task.findOneAndDelete({_id:req.params.id});
        res.status(200).json({message:'deleted Successfully'});
    }
    catch(error){
        console.log(error.message);
        res.status(500).send(error.message);       
    }
}