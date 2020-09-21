const express = require('express');
const taskController = require('../controllers/taskController.js');

const apiRouter = express.Router();


// GET ALL ITEMS 
apiRouter.get('/', taskController.getItems, (req, res) => {
    // send queried data back to client
    res.status(200).json(res.locals.allItems)
})

// CREATE NEW ITEM
apiRouter.post('/', taskController.postItem, (req, res) => {
    // send queried data back to client
    res.status(200).json(res.locals.newItemId)
})

// DELETE ITEM - getting syntax error at or near 'VALUES'
apiRouter.delete('/', taskController.deleteItem, (req, res) => {
    // send successful deletion
    res.sendStatus(200)
})


module.exports = apiRouter;