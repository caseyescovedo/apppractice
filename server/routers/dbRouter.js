const express = require('express');
const controller = require('../controllers/taskController');

const router = express.Router();

// this works (for testing)
// console.log('I made it inside dbRouter');

// this works fine (purely for testing), but the rest of the methods don't work
// router.use((req, res, next) => {
//   console.log('trying router.use to make sure router works in general');
//   next();
// });

// to get all tasks:
router.get('/',
  controller.getTasks,
  (err, req, res, next) => {
    console.log('get request has been made to database');
    if (err) {
      console.log(err);
      return next(err);
    }
    res.status(200).json(res.locals.test);
  });

// to create a task:
router.post('/', (err, req, res, next) => {
  console.log('attempting post request')
}, controller.postTask, (err, req, res, next) => {
  if (err) {
    return next(err);
  }
  // return a response here if post is successful
  res.sendStatus(200);
  // otherwise the error should have been passed out to the global error handler
});

// to delete a task by id:
router.delete('/:id', controller.deleteTask, (err, req, res, next) => {
  if (err) {
    return next(err);
  }
  res.sendStatus(200);
});

module.exports = router;
