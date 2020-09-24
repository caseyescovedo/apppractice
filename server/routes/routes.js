const express = require('express');
const router = express.Router();
const controller = require('../controllers/taskController.js');


// READ method (query all items in database)
router.get('/', controller.getTasks, (req, res) => {
  res.status(200).json(res.locals.items);
});

// CREATE one post method
router.post('/', controller.postTask, (req, res) => {
  res.status(200).json(res.locals.item);
});

//DELETE one post method
router.delete('/', controller.deleteTask, (req, res) => {
  res.status(200).json(res.locals.item);
});

module.exports = router;