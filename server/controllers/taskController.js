/*
#### Task controllers
In the `server/models/taskController.js` file, add the following functionality to the exported controller. (These will be server middleware/final handler functions, so they should take the appropriate parameters and perform the necessary callback operations.):
- [ ] Function `postTask` should create a new item in the database
- [ ] Function `getTasks` should retrieve all items from the database and send it back to the client as JSON
- [ ] Function `deleteTask` should find items in the database based on an ID number and delete that item if it exists
*/
const pool = require('./../models/TaskModel');

const postTask = (req, res, next) => {
    const { item, created_at } = req.body;
    pool.query('INSERT INTO tasks (item, created_at) VALUES ($1, $2) RETURNING *', [item, created_at], (err, result) => {
        if (err) {
            console.log('Error in postTask', err)
            return next({ err: err });
        }
        console.log('result is', result.rows);
        res.locals.task = result.rows[0];
        return next();
    });
}

const getTasks = (req, res, next) => {
    pool.query('SELECT * FROM tasks', (err, result) => {
        if (err) {
            console.log('Error in getTask', err);
            return next({ err: err });
        }
        res.locals.tasks = result.rows;
        return next();
    })
}

const deleteTask = (req, res, next) => {
    const { id } = req.body;
    pool.query(`DELETE FROM tasks WHERE id = ${id} RETURNING *`, (err, result) => {
        if (err) {
            console.log('Error in deleteTask', err);
            return next( { err: err } );
        }
        console.log(result.rows)
        res.locals.task = result.rows;
        return next();
    });
}


module.exports = {
    postTask,
    getTasks,
    deleteTask
};
