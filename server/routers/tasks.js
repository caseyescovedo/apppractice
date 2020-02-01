const express = require('express');

const router = express.Router();


// import controllers
const taskController = require('../controllers/taskController');

// Route for Get Task
router.get('/getTask', taskController.getTask, (req, res, next) => {
  res.json(res.locals.tasks);
});

// Route for Add Task
router.post('/addTask', taskController.postTask, (req, res, next) =>{
  res.sendStatus(200);
});

// Route for Delete Task
router.delete('/deleteTask', taskController.deleteTask, (req, res, next) => {
  res.sendStatus(200);
});


module.exports = router;