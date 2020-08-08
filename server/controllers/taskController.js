const Task = require('../models/TaskModel');

module.exports = {
	postTask: async function(req, res, next) {
		try {
			const task = await Task.create(req.body);
			// const tasks = await task.find({});
			// res.locals.tasks = tasks;
			return next();
		} catch (error) {
			console.log(error);
			return next(error);
		}
	},
	getTasks: async function(res, res, next) {
		try {
			const tasks = await Task.find({});
			res.locals.tasks = tasks;
			return next();
		} catch (error) {
			console.log(error);
			return next(error);
		}
	},
	deleteTask: async function(req, res, next) {
		try {
			let deleted = await Task.findOneAndDelete({
				_id: req.params.id
			});

			return next();
		} catch (error) {
			console.log(error);
			return next(error);
		}
	}
};
