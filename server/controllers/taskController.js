const db = require('../models/TaskModel');

const taskController = {};

//`postTask` should create a new item in the database
taskController.postTask = (req, res, next) =>{
    const { item } = req.body;
    const text = `INSERT INTO tasks (item, created_at)
    VALUES ($1, NOW())
    RETURNING *
    `
    const values = [ item ];
    db.query(text, values)
        .then(result => {
            res.locals.data = result.rows;
            return next();
        })
        .catch(err => next(err))
}

//`getTasks` should retrieve all items from the database and send it back to the client as JSON
taskController.getTasks = (req, res, next) =>{
    const text = `SELECT * FROM tasks`;
    db.query(text)
        .then(result =>{
            console.log(result);
            res.locals.data = result.rows;
            return next();
        })
        .catch (err => next(err))
}

//`deleteTask` should find items in the database based on an ID number and delete that item if it exists
taskController.deleteTask =(req, res, next) =>{
    const { id } = req.body;
    const text =`DELETE FROM tasks WHERE id= '${id}'`
    db.query(text)
        .then(result =>{
            res.locals.data = result.rows
            return next();
        })
        .catch (err => next(err))
}

module.exports = taskController;