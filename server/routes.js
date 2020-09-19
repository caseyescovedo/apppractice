const express = require('express');
const router = express.Router();
const controller = require('./controllers/taskController');
// db
// const mongoose = require('mongoose');
// const Task = require()

// get tasks
router.get ('/getTask', controller.getTask, (req, res) => {
  // some action
  res.send(200).json(res.locals.getTask)
});



// post tasks
router.post('/postTask', controller.postTask, (req, res) => {
  //  some action
  res.send(200).json(res.locals.postTask)
});

// delete tasks











module.exports = router;