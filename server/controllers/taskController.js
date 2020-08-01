const task = require('../models/TaskModel');

const taskController = {};

taskController.addtask = (req, res, next) => {
	task
		.create(req.body)
		.then((taskdata) => {
			res.locals.data = taskdata;
			// console.log(res.locals.data);
			return next();
		})
		.catch((err) => next(err, 'addtask error'));
};

taskController.gettask = (req, res, next) => {
	task
		.find({})
		.exec()
		.then((taskdata) => {
			res.locals.datas = taskdata;
			return next();
		})
		.catch((err) => next(err, 'gettask error'));
};

taskController.deletetask = (req, res, next) => {
	const { id } = req.params;
	// console.log(req.params);

	task
		.findByIdAndDelete(id)
		.exec()
		.then((taskdata) => {
			// console.log('processing delete');
			res.locals.data = taskdata;
			// console.log(taskdata);
			return next();
		})
		.catch((err) => next(err, 'deletetask error'));
};

module.exports = taskController;
