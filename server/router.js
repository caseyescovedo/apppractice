const express = require('express');
const router = express.Router();
const taskController = require('./controllers/taskController')
const authController = require('./controllers/authController')

//* TASKS
router.post('/postTask', taskController.postTask, (req, res, next) => {
  res.status(200).json(res.locals.result)
})

router.get('/getTasks', taskController.getTasks, (req, res, next) => {
  res.status(200).json(res.locals.tasks)
})

router.delete('/deleteTask', taskController.deleteTask, (req, res, next) => {
  res.status(200).json(res.locals.result)
})



 //* AUTH  
router.post('/', authController.authenticate, (req, res, next) => {
  res.cookie('token', 'admin');
  res.redirect(301, '/secret');
})







module.exports = router;