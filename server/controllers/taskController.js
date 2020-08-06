const db = require('../models/TaskModel')

const taskController = {};

// create a new item in the database
taskController.postTask = (req, res, next) => {
	const {task} = req.body;
	const text = `INSERT INTO Task (item) VALUES ('${task}');`
	db.query(text)
	.catch(err => {
		console.log(err)
	})
	return next();
}

// retrieve all items from the database and send it back to the client as JSON
taskController.getTasks = (req, res, next) => {
	const text = 'SELECT _id, item FROM Task'
	db.query(text)
	.then(data => {
		res.locals.tasks = data.rows
		return next()
	})
	.catch(err => {
		console.log(err)
	})
}

// find items in the database based on an ID number and delete that item if it exists
taskController.deleteTask = (req, res, next) => {
	const { id } = req.params;
	const text = `DELETE FROM Task WHERE _id = ${id};`
	db.query(text)
	.catch(err => {
		console.log(err)
	})
}

module.exports = taskController;
