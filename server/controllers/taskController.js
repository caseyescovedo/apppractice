const db = require('../models/TaskModel');
const taskController = {};

let query = ''
taskController.postTask = (req, res, next) => {
    const { item } = req.body;
    console.log(item);
    // create a new item in the db
    query = 'INSERT INTO Tasks (item) VALUES ($1) RETURNING *;'
    db.query(query, [item])
    .then(result => {
        res.locals.data = result.rows;
        return next();
    })
    .catch(err => next({
        log: `ERROR in taskController.postTask: ${err}`,
        msg: {err: 'taskController.postTask: ERROR: Check server log for details'}
    }))
}

taskController.getTasks = (req, res, next) => {
    // retrieve all items from the database and send it back to the client as JSON
    query = 'SELECT * FROM Tasks;'
    db.query(query)
    .then(result => { 
        res.locals.data = result.rows;
        return next()
    })
    .catch(err => next({
        log: `ERROR in taskController.getTasks : ${err}`,
        msg: {err: 'taskController.getTasks : ERROR: Check server log for details'}
    }))
}

taskController.deleteTask = (req, res, next) => {
    console.log("DELETE TASK")
    const { id } = req.body;
    // find items in the database based on an ID number and delete that item if it exists
    query = 'DELETE FROM Tasks WHERE _id = $1 RETURNING *;'
    db.query(query, [id])
    .then(result => { 
        res.locals.data = result.rows;
        return next();
    })
    .catch(err => next({
        log: `ERROR in taskController.deleteTask : ${err}`,
        msg: {err: 'taskController.deleteTask : ERROR: Check server log for details'}
    }))
}

module.exports = taskController;
