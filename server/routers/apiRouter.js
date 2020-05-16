const router = require('express').Router();
const taskController = require('../controllers/taskController');

router.get('/task', taskController.getTasks);
router.post('/task', taskController.postTask);
router.delete('/task/:id', taskController.deleteTask);

//any unhandled errors from the above routes will throw a generic 400 error.
router.use((err, req, res, next) => {
  console.log(err);
  return res.status(400).send('Bad Request');
});

module.exports = router;