const Tasks = require('../models/TaskModel');

const taskController = {};

taskController.postTask = (req, res, next) => {
	const { item, created_at } = req.body;
	Tasks.create({ item, created_at }, (err, result) => {
		if (err) {
			return next(err);
        }
        console.log(result)
		res.locals.task = result;
		return res.status(200).json(res.locals.task);
	});
};

taskController.getTasks = (req, res, next) => {
	Tasks.find({}, (err, result) => {
		if (err) {
			return next(err);
		}
		return res.status(200).json(result);
	});
};

taskController.deleteTask = (req, res, next) => {
	Tasks.findOneAndDelete({ _id: req.params.id }, (err, result) => {
		if (err) {
			return next(err);
		}
		return res.status(200).json(result);
	});
};

module.exports = taskController;


// {
//     "item" : "Pass this assessment6"
// }