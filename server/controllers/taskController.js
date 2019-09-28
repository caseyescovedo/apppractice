const { pool } = require('../models/TaskModel');

module.exports = {
    postTask: (req, res, next) => {
        const { task } = req.body;
        pool.query('INSERT INTO "Task" (item) VALUES ($1)', [task])
        .then((result) => {
            return next();
        })
        .catch((err) => {
            return next({
                log: `taskController.postTask: ERROR: ${err}`,
                message: { err: 'taskController.postTask: ERROR: Check server logs for details'}
            })
        })
    },

    getTasks: (req, res, next) => {
        pool.query('SELECT * FROM "Task"')
        .then((result) => {
            res.locals.items = result.rows;
            return next();
        })
        .catch((err) => {
            return next({
                log: `taskController.getTasks: ERROR: ${err}`,
                message: { err: 'taskController.getTasks: ERROR: Check server logs for details'}
            })
        })
    },

    deleteTask: (req, res, next) => {
        const { id } = req.body;
        pool.query('DELETE FROM "Task" WHERE _id = $1', [id])
        .then((result) => {
            return next();
        })
        .catch((err) => {
            return next({
                log: `taskController.deleteTask: ERROR: ${err}`,
                message: { err: 'taskController.deleteTask: ERROR: Check server logs for details'}
            })
        })
    }
};
