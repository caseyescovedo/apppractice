const db = require('../models/TaskModel.js');


const taskController = {};

taskController.postTask = (req, res, next) => {
    const { item } = req.body;

    const values = [ item, new Date().toLocaleString() ];
    const postQuery = 'INSERT INTO Task (item, created_at) VALUES ($1, $2)';

    db.query(postQuery, values, (err, response) => {

        if (err) {
            console.log("Error in post task query: ", err);
        }

        return next();
    })
}

taskController.getTasks = (req, res, next) => {
    // const { task } = req.body;

    // const values = [ task, new Date().toLocaleString() ];
    const getQuery = 'SELECT * FROM Task';

    db.query(getQuery, (err, response) => {

        if (err) {
            console.log("Error in get tasks query: ", err);
        }

        console.log("response rows inside getTasks: ", response.rows);
        res.locals.allTasks = response.rows;
        return next();
    })
}

taskController.deleteTask = (req, res, next) => {
    const { id } = req.body;

    const values = [ id ];
    const deleteQuery = 'DELETE FROM Task WHERE id=$1';

    db.query(deleteQuery, values, (err, response) => {

        if (err) {
            console.log("Error in delete task query: ", err);
        }

        return next();
    })
}

module.exports = taskController;