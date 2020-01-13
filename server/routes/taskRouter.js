const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const path = require('path');


router.get('/',  (req, res) => {
    res.cookie('verification Cookie',{token: 'admin'});
    return res.status(200).sendFile(path.join(__dirname,'../../views/secret.html'));
});
router.get('/all', taskController.getAll, (req ,res) => {
  return res.json(res.locals.tasks);
});
router.post('/', taskController.addTask ,(req, res) => {
   return res.status(200).json(res.locals.addResult);
});
router.delete('/',taskController.deleteTask ,(req, res) => {
   return res.status(200).json(res.locals.deleteResult);
});

module.exports = router;
