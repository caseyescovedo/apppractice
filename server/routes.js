const express = require('express');
const controller = require('./controllers/taskController');

const router = express.Router();

// READ method (query all items in database)
router.get('/', controller.getTasks, (req, res) => {
  console.log(req.cookies);
  res.status(200).json(res.locals.get);
});

// CREATE one post method
router.post('/', controller.postTask, (req, res) => {
  res.status(200).json(res.locals.post);
});

//DELETE one post method
router.delete('/', controller.deleteTask, (req, res) => {
  res.status(200).json(res.locals.deleted);
});
module.exports = router;
