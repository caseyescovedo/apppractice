const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.get('/', taskController.getTasks);
router.post('/:id', taskController.deleteTask);
router.post('/', taskController.postTask);

module.exports = router;
