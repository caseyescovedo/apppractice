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
	const text = 'SELECT item FROM Task'
	db.query(text)
	.then(data => {
		res.locals.tasks = data.rows
		return next()
	})
	.catch(err => {
		console.log(err)
	})
}

// find items in teh database based on an ID number and delete that item if it exists
taskController.deleteTask = (req, res, next) => {

}

module.exports = taskController;
