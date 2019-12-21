const pool = require('../models/TaskModel')

const postTask = (req, res, next) => {
    const query = `insert into "Task" (item, created_at) values ($1, now())`
    const value = [req.body.item]

    pool.query(query, value, err => {
        if (err) {
            return next(err)
        } else {
            return next()
        }
    })
}

const getTasks = (req, res, next) => {
    const query = `select * from "Task"`
    pool.query(query, (err, result) => {
        if (err) {
            return next(err)
        } else {
            res.locals.tasks = result.rows
            return next()
        }
    })
}
const deleteTask = (req, res, next) => {
    const id = req.body.id
    const query = `delete from "Task" where id = $1`
    const value = [id];

    pool.query(query, value, err => {
        if (err) {
            return next(err)
        } else {
            return next()
        }
    })
}

module.exports = {
    postTask,
    getTasks,
    deleteTask
};
