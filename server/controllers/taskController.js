const db = require('../models/TaskModel')

const taskController = {}

taskController.postTask = (req, res, next) => {
    const date = '1900-01-01 00:00:00.000'
    const { task } = req.body
    const userQuery =
        `INSERT INTO task (item, created_at) values ('${task}', '1900-01-01 00:00:00.000')`
    // const values = [task]
    db.query(userQuery)
        .then(data => {
            return next()
        })
        .catch(err => {
            res.status(404).send('There was an error with you add task request')
        })
}
taskController.getTask = (req, res, next) => {
    // const { item, created_at  } = req.body =====> should have the data in this to be pulled out
    const userQuery =
        `SELECT item FROM task `
    db.query(userQuery)
        .then(taskList => {
            console.log('This is the data from getTask ===>', taskList)
            res.locals.taskList = taskList.rows
            return next()
        })
        .catch(err => {
            return next(err)
        })
}

taskController.deleteTask = (req, res, next) => {
    // const { item, created_at  } = req.body =====> should have the data in this to be pulled out
    const userQuery =
        `DELETE FROM task WHERE item='${item}' AND created_at='${created_at}'`
    db.query(userQuery)
        .then(data => {
            console.log('The item has been deleted')
            return next()
        })
        .catch(err => {
            res.status(404).send('There was an error with deleting your task please try again!')
        })
}


module.exports = taskController;
