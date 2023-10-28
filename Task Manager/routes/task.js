const express = require('express');
const taskController = require('../controller/task')
const router = express.Router();

router.get('/',taskController.getAllTasks);
router.post('/',taskController.createTask);

//chaining convention
router.route('/:id').get(taskController.getTask).patch(taskController.updateTask).delete(taskController.delTask);

module.exports ={router}