const db = require('../models/TaskModel')

module.exports = {
    postTask: (req, res, next) => {
        const taskInput = req.body;
        const QUERY = "INSERT INTO task (key, item) VALUES ($1, $2) RETURNING item;";
        const VALUES = [key, taskInput];

        db.query(QUERY, VALUES)
        .then((data)=>{
            res.locals.message = data;
            next();
        })
        .catch((err) => {
            if (err) res.status(500).json(err);
        })
    },
    getTasks: (req, res, next) => {
        const QUERY = "SELECT * FROM task;";
        const VALUES = [];
  
        db.query(QUERY, VALUES)
        .then((data)=>{
            res.locals.message = data;
            next();
        })
        .catch((err) => {
            if (err) res.status(500).json(err);
        })
        next();
    },
    deleteTask: (req, res, next) => {
        const taskId = req.body;
        const QUERY = "DELETE FROM task WHERE key=$1 RETURNING task;";
        const VALUES = [taskId];

        db.query(QUERY, VALUES)
        .then((data)=>{
            res.locals.message = data;
            next();
        })
        .catch((err) => {
            if (err) res.status(500).json(err);
        })
    },

};
