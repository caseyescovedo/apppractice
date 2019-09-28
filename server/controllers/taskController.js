const { pool } = require('./config')
const taskController = {}

//middleware function that posts the tasks
taskController.postTask = (req, res, next) => {
    pool.query(`INSERT item INTO tasks `, (error, results) => {
        if (error) throw error;
        console.log(results, ' Results')
        return next();
    });
}

//middleware function that gets the tasks
taskController.getTasks = (req, res, next) => {
    pool.query(`SELECT * FROM tasks `, (error, results) => {
        if (error) throw error;
        console.log(results, ' Results')
        return next();
    });
}

// middleware function that removes trail from user
taskController.deleteTask = (req, res, next) => {
    const { userId, reiId } = req.body;
    pool.query(`DELETE FROM tasks WHERE user_id= ${userid}`, (error, results) => {
      if (error) throw error;
      return next();
    });
}

module.exports = {
    postTask,
    getTasks,
    deleteTask
};
