const db = require('../models/TaskModel');

const controller = {};

//fix task model js
controller.postTask = (req, res, next) => {
    const { item, created_at } = req.body;
    console.log(res.body)
    const value = [item, created_at];
    const query = "INSERT INTO Task (item, created_at) VALUES ($1, $2) RETURNING *";

    db.query(query, value, (err, response) => {
        if (err) {
            return next(err);
        } else {
            res.locals.addTask = response.rows[0];
            return next();
        }
    })
};

controller.getTasks = (req, res, next) => {
    const query = "SELECT * FROM Tasks RETURNING *";

    db.query(query, (err, response) => {
        if (err) {
            return next(err);
        } else {
            res.locals.tasks = response.rows;
            return next();
        }
    })
};

controller.deleteTask = (req, res, next) => {
    const [ _id ] = req.body;
    const value = [ _id ];
    const query = "DELETE FROM Tasks WHERE _id = $1";

    db.query(query, value, (err, response) => {
        if (err) {
            return next(err);
        } else {
            res.locals.delete = response.rows[0];
            return next();
        }
    })
};


module.exports = controller;

//create table
// CREATE TABLE Task (
//     _id SERIAL PRIMARY KEY,
//     item text NOT NULL(200),
//     created_at text NOT NULL(200)
//     );

//insert query
// INSERT INTO Task (item, created_at) VALUES ('get shit together', 'three')