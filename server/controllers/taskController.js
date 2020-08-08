const db = require('../models/TaskModel')
const taskController = {};

taskController.postTask = (req, res, next) =>{
    console.log('inside taskController.postTask')
    const query = `INSERT INTO tasks (item, created_at) VALUES ('${req.body.taks}', ${req.body.created_at});`;

    db.query(query).then(data => {
        res.locals.task = data.rows
        return next()
    }).catch(err => {
        console.log('Error in postTask')
        return next(err)
    })
}

taskController.getTasks = (req, res, next) =>{
    console.log('inside taskController.getTasks')
    const query = `SELECT * FROM tasks`
    db.query(query).then(data =>{
        res.locals.task = data.rows;
        return next()
    }).catch(err => {
        console.log('Error in getMessage')
        return next(err)
    })
}

taskController.deleteTask = (req, res, next) => {
    console.log('inside taskController.deleteTask')
    const query = `DELETE FROM tasks WHERE id='${req.params.id}';`;
    db.query(query).then(data => {
        console.log('deleting task')
        return next();
    }).catch(err => {
        console.log('error in deleteTask')
        return next(err)
    })
}

module.exports = taskController