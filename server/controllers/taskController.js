const db = require('../models/TaskModel');

const taskController = {};

taskController.getTask = (req, res, next) => {
	const task = 'SELECT * FROM "Task"';
	db
		.query(task)
		.then(data => {
			res.locals = data.rows
			next()
		})
		.catch((err) => {
			setImmediate(() => {
				throw err;
			});
		});
};

taskController.postTask = (req, res, next) => {
	const { item } = req.body;
	const params = [item];
	const queryStr = `INSERT INTO "Task" (item) VALUES ($1) RETURNING *`;
	db
		.query(queryStr, params)
		.then(result => {
			res.locals.data = result.rows;
			return next();
		})
};

taskController.deleteTask = (req, res, next) => {
	const { id } = req.body;
	console.log('over here', id)
	const params = [id];
	const queryStr = `DELETE FROM "Task" WHERE id = ($1)`;
	db
		.query(queryStr, params)
		.then(result => {
			console.log('this is result',result)
		})
		.then(next)
		.catch((err) => {
			setImmediate(() => {
				throw err;
			});
		});
};

module.exports = taskController;
