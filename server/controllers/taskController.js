const db = require('../models/TaskModel.js');
const taskController = {};



// GET ALL ITEMS 
taskController.getItems = (req, res, next) => {
    //query all items from Task table 
    const text = 'SELECT * FROM Task';

    db.query(text)
    .then(result => {
        // store record data 
        res.locals.allItems = result.rows;
        next();
    })
    // query error handler
    .catch(err => next(err));
}

// CREATE NEW ITEM
taskController.postItem = (req, res, next) => {
    // prepare query and user input
    const text = 'INSERT INTO Task (item) VALUES($1) RETURNING *';
    const params = [req.body.item];

    // create new task record in Task table 
    db.query(text, params)
    .then(result => {
        // store record data
        res.locals.newItemId = result.rows.item_id;
        next();
    })
    // query error handler
    .catch(err => next(err));
}


// DELETE TASK IN DATABASE - getting syntax error at or near 'VALUES'
taskController.deleteItem = (req, res, next) => {

    console.log(req.body.item_id)
    // prepare query and item_id
    const text = 'DELETE FROM Task WHERE item_id = (item_id) VALUES($1)';
    const params = [req.body.item_id];

    db.query(text, params)
    .then(result => {
        console.log('successful deletion');
        next();
    })
    .catch(err => next(err));
}



module.exports = taskController;