const db = require('../models/TaskModel.js');

const taskController = {};

taskController.postTask = function(req, res, next){
    console.log("The body: ", req.body);
    const { task } = req.body;
    console.log("The task: ", task);
    const query = `INSERT INTO Task(item) VALUES($1);`;
    const params = [task];

    db.query(query, params)
    .then((data) => {
        next();
    })
    .catch((err) => {
        next(err);
    })
}

taskController.getTask = function(req, res, next){
    const query =  `SELECT * FROM Task;`;
    db.query(query, [])
    .then((data) => {
        res.locals.task = data.rows;
        next();
    })
    .catch((err) => {
        next(err);
    })
}

taskController.deleteTask = function(req, res, next){
    const { task } = req.body;
    const query =  `DELETE FROM Task WHERE item = $1;`;
    const params = [task];
    db.query(query, params)
    .then((data) => {
        next();
    })
    .catch((err) => {
        next(err);
    })
}

module.exports = taskController;