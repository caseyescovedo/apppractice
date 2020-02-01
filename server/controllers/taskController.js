const db = require('../models/TaskModel.js');

//after requiring task model database, create toDoController
const taskController = {};



taskController.createTask = (req, res, next) => {
    //destructure task from req.body
    console.log('this is req.body: ', req.body);
    const { task } = req.body;
    const taskArr = [task];
    const queryString = 'INSERT INTO todoList (tasks) VALUES ($1)';
    db.query(queryString, taskArr, (err, response)=>{
        //if error, pass error into next();
        if(err) next({
            log: 'Database insert error',
            status: '400',
            message: {err},
        });
        return next();
    });
   
}

taskController.getAllTasks = (req, res, next) => {
    const queryString = 'SELECT * FROM todoList';
    db.query(queryString, (err, response)=>{
        if(err) next({
            log: 'Database error when getting all tasks',
            status: '400',
            message: {err}
        });
        console.log('This is response with all tasks in database: ', response);
        res.locals.allTasks = response.rows;
        return next();
    });
}

    taskController.deleteTask = (req, res, next) => {
        //destructure id from request body
        console.log(req.body);
        const { id } = req.body;
        
        const deleteArr = [id];
        const queryString = 'DELETE FROM todoList WHERE id = $1';
        console.log('should be deleting: ', deleteArr);
        db.query(queryString, deleteArr, (err)=>{
            if(err) next({
            log: 'Database error when deleting task',
            status: '400',
            message: {err}
            });
            return next();
        });
    }



module.exports = taskController;
