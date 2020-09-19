const express = require('express');
const path = require('path');
const cookies = require('cookie-parser');

const router = express.Router();
// use cookieParser
router.use(cookies());

const taskController = require('./controllers/taskController');
const authController = require('./controllers/authController');

// route post requests through taskController postTasks method
router.post('/', taskController.postTask, (req, res) => {
  res.status(200).send(res.locals.postedTask);
});

// route delete requests through taskController delete task method
router.delete('/', taskController.deleteTask, (req, res) => {
  res.status(200).send(res.locals.deletedTask);
});

// route get requests through taskController getTasks method
router.get('/all', taskController.getTasks, (req, res) => {
  res.status(200).send(res.locals.allTasks);
});

// serve static files to requests to /secret
router.get('/', authController.verifyCookie, (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../views/secret.html'));
});

module.exports = router;
