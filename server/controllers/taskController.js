const db = require('../models/TaskModel');

const taskController = {};

taskController.postTask = (req, res, next) => {
    const { item } = req.body;
    const values = [item];
    const post = `INSERT INTO task (item, created_at)
    VALUES ($1 , CURRENT_TIMESTAMP) returning *;`

    db.query(post, values,
        (err, post) => {
            if (err) {
                return next(err);
            } else {
                res.locals.post = post.rows[0];
                return next();
            }
        })
}

taskController.getTasks = (req, res, next) => {
    const getTodos = `SELECT * FROM task;`
    db.query(getTodos)
    .then((data) => {
        res.locals.allTasks = data.rows;
        return next();
    })
    .catch((err) => {
        console.log(err);
        return next(err);
    })
}

taskController.deleteTask = (req, res, next) => {
    const { _id } = req.body;
    const values = [_id];
    const deleteToDo = `DELETE FROM task WHERE _id = $1 RETURNING _id;`
    db.query(deleteToDo, values, (err, response) => {
        if (err) {
            return next(err);
        } else {
            res.locals.deleted = response.rows[0];
            return next();
        }
    })
}

module.exports = taskController;
