const express = require('express');
const router = express.Router();
const path = require('path');
const taskController = require('../controllers/taskController');

// router.use('/', (req, res) => {
//     res.status(200).sendFile('../../views/secret.html')
// })

router.get('/', taskController.getTasks, (req, res) => {
    res.status(200).json(res.locals.tasks);
})

router.post('/', taskController.postTasks, (req, res) => {
    res.status(200).json(res.locals.post);
})

// route.put here would be updates 

// route.delete would be delete 

module.exports = router;