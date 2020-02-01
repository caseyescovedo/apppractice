const db = require('../models/TaskModel.js');
const taskController = {};


taskController.postTask = ((req, res, next) => {
    const { item } = req.body;
    const dataArr = [item];
    const queryStr = 'INSERT INTO Tasks (item) VALUES ($1)';
    db.query(queryStr, dataArr)
    .then(response => {
        console.log('Response is', response.rows)
        res.locals.item = response.rows;
        return next()
    })
});

taskController.getTasks = ((req, res, next) => {
    const queryStr = 'SELECT * FROM Tasks';
    db.query(queryStr)
    .then(response => {
        console.log('Response is', response.rows)
        res.locals.item = response.rows;
        return next()
    })
});

taskController.deleteTask= ((req, res, next) => {
    const { id } = req.body;
    const dataArr = [id]
    const queryStr = 'DELETE FROM Tasks WHERE id=($1)';
    db.query(queryStr, dataArr)
    .then(response => {
        console.log('Response is', response.rows)
        res.locals.item = response.rows;
        return next()
    })
});



module.exports = taskController;
