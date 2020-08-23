const db = require('../models/TaskModel')
const taskController = {}

taskController.getTask = async (req, res, next) => {
    const query= `
    SELECT * FROM task`
    const {rows} = await db.query(query)
    res.locals.tasks = rows
    next()
}

//why cant it destructure property id??
taskController.deleteTask = async (req,res,next) => {
    const {id} = req.body
    console.log(req.body)
    const query = `
    DELETE FROM task WHERE id = ${id}
    `
    const response = await db.query(query)
    res.locals.deleted = await response

}


taskController.addTask = async (req,res,next) => {
    const {item} = req.body
    const query = `
    INSERT INTO task (item) VALUES ('${item}')`
    const {rows} = await db.query(query)
    res.locals.tasks = await rows[0]
    next()
}
module.exports = taskController