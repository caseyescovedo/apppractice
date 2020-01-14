const db = require('../models/TaskModel'); //able to query from SQL DB

const taskController = {};

taskController.postTask = (req, res, next) => {
    const { task } = req.body;
    const today = new Date();
    const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date+time;

    const text = `
        INSERT INTO tasks(item, created_at)
        values($1, $2);
    `
    const values = [task, time];

    db.query(text, values)
        .then(response => console.log(response))
        .catch(err => console.log(err))

    next();
}

//allow middleware to become synchronous to pass into res.locals the response to send back to client
taskController.getTasks = async (req, res, next) => {
    const text = `
        SELECT * from tasks
    `

    await db.query(text)
        .then(response => {
            res.locals.allTasks = response.rows;
            console.log(response)})
        .catch(err => console.log(err))

    next();
}

taskController.deleteTask = (req, res, next) => {
    const { item } = req.body;
    let withoutX = '';

    for (let i = 0; i < item.length - 1; i++) {
        withoutX += item[i];
    }

    // console.log(withoutX);

    const text = `
        DELETE from tasks
        WHERE item = '${withoutX}'
    `

    db.query(text)
        .then(response => console.log(response))
        .catch(err => console.log(err))

    next();
}
module.exports = taskController;