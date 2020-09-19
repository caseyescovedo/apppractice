const express = require('express');
const munch = require('cookie-parser');
const controller = require('./controllers/taskController');

const router = express.Router();
router.use(munch());

// read method to query all items in database
router.get('/', controller.getTasks, (req, res) => {
  res.status(200).json(res.locals.retrievedData);
});

router.post('/', controller.postTask, (req, res) => {
  res.status(200).json(res.locals.postedData);
});

router.delete('/', controller.deleteTask, (req, res) => {
  res.status(2000).json(res.locals.deletedData);
});
module.exports = router;
