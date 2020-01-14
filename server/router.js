const express = require('express');
const router = express.Router();
const {getTasks, postTask, deleteTask} = require("./controllers/taskController");

console.log('router.js is running.')
router.post('/', 
function(req, res, next) {console.log('post router is working correctly.'); return next()}, 
postTask, function(req, res) {
  res.status(200).json(res.locals.taskItem)
});

router.get('/', 
function(req, res, next) {console.log('get router is working correctly.'); return next()}, 
getTasks, function(req, res) {
  res.status(200).json(res.locals.tasks)
});

router.delete('/', 
function(req, res, next) {console.log('get router is working correctly.'); return next()}, 
deleteTask, function(req, res) {
  res.status(200).json(res.locals.taskItem)
});


module.exports = router;