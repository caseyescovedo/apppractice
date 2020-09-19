const express = require('express');
const taskController = require('./controllers/taskController');
const authController = require('./controllers/authController');

// COOKIE PARSER --> RIGHT NOW ONLY THINGS COMING INTO API WOULD GET COOKIE PARSED
const munch = require('cookie-parser');

const router = express.Router();

// PASS IN COOKIE PARSER INVOCATION TO ROUTER
router.use(munch());

// // LOGIN
// router.post('/', authController.verifyUser, (req, res) => {
//   // IF USER IS VERIFIED...
//   res.status(200).cookie('token', 'admin').sendFile()
// })

// READ ALL ENTRIES IN OUR DB
router.get('/', taskController.getTasks, (req, res) => {
  // SEND BACK ON RESPONSE STATUS, COOKIE, AND JSON DATA FROM QUERY
  res.status(200).cookie('cookie-text', 10).json(res.locals.allItems);
});

// // CREATE ENTRY IN OUR DB
router.post('/', taskController.postTask, (req, res) => {
  res.status(200).json(res.locals.newTask);
});

// DELETE ENTRY IN OUR DB
router.delete('/', taskController.deleteTask, (req, res) => {
  res.status(200).json(res.locals.deletedTask);
});

module.exports = router;
