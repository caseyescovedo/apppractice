const { pool } = require('../config');

const taskController = {}

taskController.postTask = (req, res, next) => {

    pool.query(`INSERT INTO Task (item, created_at) VALUES ();`, 
    (err, results) => {
        if (err) {
          throw err
        }
        // res.locals.row
        next();
    });
}

taskController.getTask = (req, res, next) => {

    pool.query(`INSERT INTO Task (item, created_at) VALUES () WHERE 
    co  ;`, 
    (err, results) => {
        if (err) {
          throw err
        }
        // res.locals.row
        next();
    });
}


taskController.deleteTask = (req, res, next) => {

    pool.query(`DELETE FROM Task WHERE condition;;`, 
    (err, results) => {
        if (err) {
          throw err
        }
        // res.locals.row
        next();
    });
}



module.exports = taskController;
