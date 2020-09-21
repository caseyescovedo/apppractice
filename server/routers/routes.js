const express = require('express');
const taskController = require('../controllers/taskController');
const router = express.Router();

// ROUTES THE GET REQUEST TO RETRIEVE ALL THE TASKS FROM THE DB
router.get('/getData', taskController.getTasks, (req, res) => {
  console.log('GET ROUTER HERE');
  res.status(200).json(res.locals.allItems);
});

// ROUTES THE POST REQUEST TO ADD A TASK TO THE DB
router.post('/addData', taskController.postTasks, (req, res) => {
  res.status(200).json(res.locals.addedItem);
});

// ROUTES THE DELETE REQUEST TO REMOVE A TASK FROM THE DB
router.delete('/deleteData', taskController.deleteTask, (req, res) => {
  res.status(200).json(res.locals.deletedItem);
});

module.exports = router;
