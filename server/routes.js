const express = require('express');
const router = express.Router();
const controller = require('./controllers/taskController');
// db
// const mongoose = require('mongoose');
// const Task = require()

// get tasks
router.get ('/getTask', controller.getTask, (req, res) => {
  // some action
  console.log('back to router, res.locals.getTask = ', res.locals.getTask)
  res.sendStatus(200).json(res.locals.getTask)
});



// post tasks
router.post('/postTask', controller.postTask, (req, res) => {
  //  some action
  console.log('back to router')
  res.sendStatus(200).json(res.locals.postTask)
});

// delete tasks - NOT working in the middelware (postman shows OK though)
router.delete('/deleteTask', controller.deleteTask, (req, res) => {
    console.log('back to router')
    res.sendStatus(200).json(res.locals.deleteTask)
});



module.exports = router;