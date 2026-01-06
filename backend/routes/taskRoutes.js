const express = require('express');
const {getAllTasks,addTask,updateTask,deleteTask}= require('../controllers/tasksController.js')

const router = express.Router();

router.get('/tasks',getAllTasks);
router.post('/tasks',addTask);
router.patch('/tasks/:id',updateTask);
router.delete('/tasks/:id',deleteTask);

exports.router=router;