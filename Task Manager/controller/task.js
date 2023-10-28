const { default: mongoose } = require('mongoose');
const Task = require('../models/task');
const asyncWrapper = require('../middleware/asyncWrapper')
const {creatCustomError} = require('../Error/customError')

const getAllTasks = asyncWrapper(async (req,res) => {
        const tasks = await Task.find({});
        res.json({tasks})
});

const createTask = asyncWrapper(async (req,res) => {
    const name = req.body.name;
    const completed = req.body.completed
    if(name.length > 0){
        const newTask = await Task.create({name:name,completed:completed});
        res.json(newTask)            
    }else{
          res.end();
    }
}
)
const getTask = asyncWrapper(async (req,res,next) => {
    const taskId = req.params.id;
    if(taskId.length < 24){
        return res.status(404).json({msg :"short task id"});    
    }
    const task = await Task.findById(taskId);
    if(!task)
    {
        const error = creatCustomError('id not found',404);
        return next(error)
    }
    else 
    {
        res.json({task}); 
    } 
})
const updateTask = asyncWrapper(async (req,res) => {
    const taskId = req.params.id;
    if(taskId.length < 24){
        return res.status(404).json({msg :"short task id"});    
    }  
    const task = await Task.findOneAndUpdate(
                            {"_id":taskId},
                            req.body,
                            {
                                new:true,
                                runValidators:true
                            });
    if(!task){
        return res.status(404).json({msg :"no task with this id"});    
        }
        else {
        res.json({task:task,successful :true}); 
        }
})

const delTask = asyncWrapper(async (req,res) => {
    const taskId = req.params.id;
    if(taskId.length < 24){
        return res.status(404).json({msg :"short task id"});    
    }
    const task = await Task.findOneAndDelete({"_id":taskId});
    if(!task){
        return res.status(404).json({msg :"no task with this id"});    
        }
        else {
            res.json({task:task,successful :true}); 
        }

})


module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    delTask
}