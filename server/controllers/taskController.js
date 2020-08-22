// Function postTask should create a new item in the database
// Function getTasks should retrieve all items from the database and send it back to the client as JSON
// Function deleteTask should find items in the database based on an ID number and delete that item if it exists
 
const db= require('../models/TaskModel.js')

const taskController = {};

taskController.postTasks = (req, res, next) => {
    const query = `INSERT INTO tasks (item) VALUES ($1)`
    const params = [req.body.item]
    db.query(query, params).then((res) => {return res}).then((data) => {return next()})
}

taskController.getTasks = (req, res, next) => {
    const query = `SELECT * FROM tasks`
    db.query(query).then((res) => {return res}).then((data) => {return next()})
}

// taskController.deleteTasks = (req, res, next) => {

// }

module.exports = taskController
