
// const db = require('db');
const pool = require ('../database.js');


const taskController = {};



taskController.postTask = (req, res, next) => {
    const {task} = req.body;
    pool.query('INSERT INTO task (task) VALUES ($1)', [task], (error) => {
        if (error) throw error;
    });
    return next();
};

taskController.getTasks = (req, res, next) => {
    pool.query('SELECT item FROM task', (error) => {
        if (error) res.status(400).send(error);
    })
    return next();
}

taskController.deleteTask = (id, req, res, next) => {
    const {task} = req.header.id
    pool.query(`DELETE FROM task WHERE id = ${id}`, [task], (error) => {
        if (error) res.status(400).send(error);
    })
    return next();
}


module.exports = taskController;
