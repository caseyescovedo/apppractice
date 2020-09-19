const db = require('../models/TaskModel');

module.exports = {
    // Create a new item in the database
    postTask: (req, res, next) => {
        const { item } = req.body;
        const values = [item];
        const queryStr = `INSERT INTO tasks (item) VALUES ($1) RETURNING *`;
        db.query(queryStr, values)
        .then (data => {
            res.locals.task = data.rows[0];
            console.log(res.locals.task)
            return next();
        })
        .catch(err => {
            console.log('Error in postTask controller')
            return next(err);
        })
    },

    // Retrieve all items from the database and send it back to the client as JSON
    getTasks: (req, res, next) => {
        const queryStr = `SELECT * FROM tasks`
        db.query(queryStr)
        .then(data => {
            res.locals.allTasks = data.rows
            return next();
        })
        .catch(err => {
            console.log('Error in getTasks controller')
            return next(err);
        })
    },

    // Find items in the database based on an ID number and delete that item if it exists
    deleteTask: (req, res, next) => {
        const { id } = req.body;
        const values = [id]
        const queryStr = `DELETE FROM tasks WHERE id=$1`;
        db.query(queryStr, values)
        .then(data => {
            return next();
        })
        .catch(err => {
            return next(err);
        })
    }
};
