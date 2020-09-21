const db = require('../models/TaskModel.js');

const taskController = {};

taskController.getTasks = (req, res, next) => {
    db.query('SELECT * FROM task')
        .then((data )=> {
            res.locals.tasks = data.rows;
            return next();
        })
        .catch((err) => {
            return next(err)
        });
};

taskController.postTasks = (req, res, next) => {
    const { item } = req.body;
    const values = [item]
    db.query('INSERT INTO task (item) VALUES ($1) returning *;', values, (err, response) => {
        if (err){
            return next(err);
        }
        res.locals.post = response.rows[0];
        return next();
    })
}

module.exports = taskController;
