const tasks = require('../models/TaskModel');
const path = require('path');

const taskController = {};

taskController.postTask = (req, res, next) => {
	try {
		const { item } = req.body;
		tasks.create({ item: item })
			.then(resp => res.sendStatus(200));
	} catch (error) {
		console.log(error.message)
	}
};

taskController.getTasks = async (req, res, next) => {
	try {
		let allTasks = await tasks.find({});
		res.json(allTasks);
	} catch (error) {
		console.log(error.message)
	}
};

taskController.deleteTask = async (req, res, next) => {
	try {
		const { id } = req.body;
		let deleted = await tasks.deleteOne({ _id: id });
		res.json(deleted);
	} catch (error) {
		console.log(error.message)
	}
};

module.exports = taskController;
