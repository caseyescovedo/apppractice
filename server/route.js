const express = require('express');

const router = express.Router();
const list = require('./controllers/taskController');

router.get('/', list.getTasks, (req, res) => {
  res.status(200).send(res.locals.items);
});

router.post('/', list.postTask, (req, res) => {
  console.log('added task!');
});

router.delete('/', list.deleteTask, (req, res) => {
  console.log('deleted!');
});

router.put('/', list.editItem, (req, res) => {
  res.status(200).send('message updated');
});

module.exports = router;
