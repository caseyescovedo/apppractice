const db = require('../models/TaskModel.js')
const taskController = {};

taskController.postTask = (req,res,next) => {
    const item = req.body.item
    const created_at = req.body.created_at
    console.log(req.body.item)
    console.log(req.body.created_at)
    const addTask = `INSERT INTO Task(item, data_created)
    VALUES($1,$2);`
    db.query(addTask,[item, created_at])
    .then(() => {
        return next();
    })
    .catch(err => next({
        status: 500,
        log: 'this came from task controller post'}))
}

taskController.getTasks = (req,res,next) => {
    const getTasks = `SELECT * FROM Task`
    db.query(getTasks)
    .then((result) => {
        res.locals.tasks = result.rows
        return next();
    })
    .catch(err => next({
        status: 500,
        log: 'this is broken, gettasks'}))
}

taskController.deleteTask = (req,res,next) => {
    const deleteTask = `DELETE FROM task
    WHERE id=$1;`
    db.query(deleteTask, [req.params.id])
    .then(() => {
        return next();
    })
    .catch(err => next({
        status: 500,
        log: 'this came from delete task'}))
}


module.exports = taskController;
