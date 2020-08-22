const Task = require('../models/TaskModel')

const taskController = {}

taskController.postTask = async (req, res, next) => {
	const { item } = req.body;
	console.log("req body here", req.body)
	try {
		const create = await Task.create({ item })
		res.locals.create = item
		next()
	} catch (err) {
		console.log('error in postTask controller', err)
	}
}


taskController.deleteTask = async (req, res) => {
	console.log("reqparamshere", req.params)
	await Task.findOneAndDelete({ _id: req.params.id }, function (err, data) {
		if (err)
			return next(err)
		else
			res.status(200).json({ msg: data })
	})
}



module.exports = taskController
