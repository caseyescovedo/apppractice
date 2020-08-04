const db = require('../models/TaskModel.js')
const taskController = {};
taskController.postTask = (req, res, next) => {
    console.log("howdy", req.body)
    const qs = `INSERT INTO "public"."Tasks" (item) VALUES('${req.body.text}');`
    db.query(qs)
    .then((results) => {
        res.locals.results = "Successful Post";
        next();
    })
    .catch((err) => next(err))
    
} 
taskController.getTasks = (req, res, next) => {
    const qs = 'SELECT * FROM "Tasks"';
    db.query(qs)
    .then((results) => {
        res.locals.tasks = results.rows;
        next();
    })
    .catch((err) => next(err));
}


taskController.deleteTask = (req, res, next) => {
    console.log('deleteTask', req.body.id);
    const qs = `DELETE FROM "Tasks" WHERE _id = ${req.body.id}`;
    db.query(qs)
    .then((results) => {
        res.locals.results = results.row;
        next();
    })
    .catch((err) => next(err))
}

module.exports = taskController;
