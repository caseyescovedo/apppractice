const express = require('express');
const controller = require('./controllers/taskController');
const router = express.Router();
//create route to the secret page with middleware 
router.post('/secret', controller.postTask, (req, res) => {
    res.status(200).json(res.locals.post);
})

// getTasks should retrieve all items from the database and send it back to the client as JSON

router.get('/secret', controller.getTasks, (req, res) => {
    res.status(200).json(res.locals.details);
})
//delete entry from db
router.delete('/secret', controller.deleteTask, (req, res) => {
    res.status(200).json(res.locals.deleted);
})
module.exports = router;