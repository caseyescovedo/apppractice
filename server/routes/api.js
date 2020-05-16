const express = require('express');
const taskController = require('../controllers/taskController')
const authController = require('../controllers/authController')
const router = express.Router();

router.get('/getTask', taskController.getTask, (req, res) => {
  res.status(200).json(res.locals.tasks);
})
router.post('/postTask', taskController.postTask, (req, res) => {
  res.status(200).json(res.locals.tasks);
})
router.get('/deleteTask', taskController.deleteTask, (req, res) => {
  res.status(200).send('')
})
//for deleteTask I put ids onto the table but am not able to grab an id to match from the html
//not sure how to pass the request body id from the X button

router.post('/signin', authController.verify, (req, res) => {
  res.status(200).redirect('/secret')
})

module.exports = router;