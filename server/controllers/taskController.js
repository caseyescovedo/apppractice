const db = require('../models.TaskModel');

const taskController = {};

taskController.postTask = (req, res, next) => {
    const item = req.body.item;
    const created_at = req.body.created_at;
    const addTask = `INSERT INTO Task(item, data_created)
    VALUES ($1, $2)`
    db.query(addTask,[item, created_at])
    .then(() => {
        return next();
    })
    .catch(err => next({
        status: 500,
        log: 'error from TaskController.js postTask'
    }))
}

taskController.getTask = (req, res, next) => {
    const getTask = `SELECT * FROM Task`
    db.query(getTask)
    .then(() =>{
        return next();
    })
    .catch(err => next({
        status: 500,
        log: 'error from TaskController.js getTask'
    }))
}

taskController.deleteTask = (req, res, next) => {
    const deleteTask = `DELETE FROM Task WHERE id=$1;`
    db.query(deleteTask, [req.params.id])
    .then(() => {
        return next();
    })
    .catch(err => next({
        status: 500,
        log: 'error from TaskController.js deleteTask'
    }))
}

module.exports = taskController;