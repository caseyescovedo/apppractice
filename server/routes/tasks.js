var express = require('express')
var router = express.Router()
const controller = require('../controllers/taskController');

console.log(controller);

router.get('/', controller.getTasks);
router.post('/', controller.postTask);
router.delete('/', controller.deleteTask);

module.exports = router;