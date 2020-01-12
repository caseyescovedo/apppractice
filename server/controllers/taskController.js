const db = require('../models/TaskModel');

const taskController = {};

taskController.postTask = async (req, res, next) => {
    //create new instance in DB
    const { item } = req.body;
    const text = `INSERT INTO task (item,created_at)
    VALUES ('${item}',NOW());`

    await db.query(text)
    .then((response) => {
    })
    .catch(err => console.log(err));
    next();
}

taskController.getTasks = async (req, res, next) => {
    //get all
    const text = `SELECT * FROM task;`;

    await db.query(text)
    .then((response) => {
        res.locals.tasks = response.rows;
    })
    .catch(err => console.log(err));
    next();
}

taskController.deleteTask = async (req, res, next) => {
    console.log(req.body);
    const { item } = req.body;
    const text = `DELETE FROM task
    WHERE item = '${item}';`

    await db.query(text)
    .then((response) => {
        console.log('this is inside deleteTaskController:', response)
    })
    .catch(err => console.log(err));
    next();
}




module.exports = taskController;
