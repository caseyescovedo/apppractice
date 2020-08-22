const db = require('../models/TaskModel');
const taskController = {};

// Creating a task controller
taskController.postTask = (req, res, next) => {

    // Grabbing an item from the body
    const { item } = req.body;

    // INSERT INTO Task (item) VALUES ('hello');
    let insertQuery = `INSERT INTO Task (item) VALUES ($1)`
    let insertValue = [item];

    // Execute the query
    db.query(insertQuery, insertValue)
    .then(data => {
        return next();
    })
    .catch(err => {
        return next({
            log: `An error occurred while creating a task: ${err}`,
            message: { err: "An error occurred in taskController.postTask" },
          });
    })
}

// Getting a task controller
taskController.getTasks = (req, res, next) => {
    
    // SELECT * FROM Task;
    let insertQuery = `SELECT * FROM Task`
    
    // Execute the query
    db.query(insertQuery)
    .then(data => {
        res.locals.tasks = data.rows;
        return next();
        
    })
    .catch(err => {
        return next({
            log: `An error occurred while getting tasks: ${err}`,
            message: { err: "An error occurred in taskController.getTasks" },
        });
    })
}

//Deleting a task controller
taskController.deleteTask = (req, res, next) => {
    
    // Grabbing an id from the body
    const { id } = req.body;
    
    // DELETE FROM Task WHERE id=$1;
    let insertQuery = `DELETE FROM Task WHERE id=$1`;
    let insertValue = [id]
    
    // Executing the query
    db.query(insertQuery, insertValue)
    .then(data => {
        return next();
    })
    .catch(err => {
        return next({
            log: `An error occurred while deleting a task: ${err}`,
            message: { err: "An error occurred in taskController.deleteTask" },
        });
    })

}

module.exports = taskController;
