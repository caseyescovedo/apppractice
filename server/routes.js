// const express = require('express');
// const taskController = require('./controllers/taskController');
// const authController = require('./controllers/authController');

// // COOKIE PARSER --> RIGHT NOW ONLY THINGS COMING INTO API WOULD GET COOKIE PARSED
// const munch = require('cookie-parser');

// const router = express.Router();

// // PASS IN COOKIE PARSER INVOCATION TO ROUTER
// router.use(munch());

// // READ ALL ENTRIES IN OUR DB
// router.get('/', taskController.getData, (req, res) => {
//   // SEND BACK ON RESPONSE STATUS, COOKIE, AND JSON DATA FROM QUERY
//   res.status(200).cookie('raisin', 7).json(res.locals.info);
// });

// // CREATE ENTRY IN OUR DB
// router.post('/', taskController.createEntry, (req, res) => {
//   res.status(200).json(res.locals.newEntry);
// });

// // UPDATE ENTRY IN OUR DB
// router.put('/', taskController.updateEntry, (req, res) => {
//   res.status(200).json(res.locals.updatedEntry);
// });

// // DELETE ENTRY IN OUR DB
// router.delete('/', taskController.deleteEntry, (req, res) => {
//   res.status(200).json(res.locals.deletedEntry);
// });

// module.exports = router;
