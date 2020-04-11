//import Postgres DB
const db = require('../models/TaskModel.js');

//set up controller object
let taskController = {};

//middlewares
//retrieve all messages from databse
taskController.getTasks = (req, res, next) => {
    //create sql query to get all messages from databse
    const allTasks = 'SELECT item FROM tasks';
    //set up a query to obtain all messages from database
    db.query(allTasks)
    .then((task) =>  {
        let tasks = task.rows.map(a => a.item)
        res.locals.tasks = tasks
        return next();
    })
    .catch(err => {
        console.log("Error: ", err);
        return next(err);
      });
}

//post new message to db
taskController.postTasks = (req, res, next) => {
    //create sql query to access rows in database that will be updated
    const postTasks = req.body.item;

    const add = `INSERT INTO tasks (item) VALUES ($1) RETURNING *`;
    const values = [postTasks]

    db.query(add, values)
    .then((response) =>  {
        res.locals.postTask = response.rows;
        return next();
    })
    .catch(err => {
        console.log("Error: ", err);
        return next(err);
      });
}


module.exports = taskController;
