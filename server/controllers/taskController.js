const db = require('../models/TaskModel.js');
const taskController = {};

taskController.getTasks = async (req, res, next) => {
    const queryString = 'SELECT * FROM Tasks';
    try {
        const { rows: tasks } = await db.query(queryString);
        res.locals.tasks = tasks;
        return next();
    } catch(err) {
        return next({
            message: { err },
            log: 'Error in taskController.getTasks',
            status: 400,
        });
    }
};

taskController.postTasks = async (req, res, next) => {
    const { task } = req.body;
    const queryString = {
        text: 'INSERT INTO Tasks (item) VALUES ($1) RETURNING id, item',
        values: [task],
    };
    try {
        const { rows: task } = await db.query(queryString);
        res.locals.task = task[0];
        return next();
    } catch(err) {
        return next({
            message: { err },
            log: 'Error in taskController.postTasks',
            status: 400,
        });
    }
};

taskController.deleteTask = async (req, res, next) => {
    const { id } = req.body;
    const queryString = {
        text: 'DELETE FROM Tasks WHERE id=$1',
        values: [id],
    };
    try {
        await db.query(queryString);
        return next();
    } catch(err) {
        return next({
            message: { err },
            log: 'Error in taskController.deleteTask',
            status: 400,
        });
    }
};

module.exports = taskController;
