const { User } = require('../models/TaskModel');

const taskController = {}

taskController.addTask = (req, res, next) => {
	// console.log("body", req.body.user)
	User.findOneAndUpdate({ username: req.body.user }, { $push: { tasks: req.body.task }})
		.then(user => {
			// console.log(user.tasks)
			res.locals.tasks = user.tasks
			console.log(res.locals.tasks)
		})
		.then(data => data.save())
		.catch(err => next(err))
	return next();

	// 	console.log(something)
	// } catch (err) {
	// 	return next(err)
	// }
}

taskController.getTasks = (req, res, next) => {
	// console.log("body", req.body.user)
	User.findAll({ username: "codesmith" })
		.then(user => {
			res.locals.tasks = [];
			for(let task of user.tasks){
				res.locals.tasks.push(task); 
			}

			console.log("res.locals.tasks", res.locals.tasks)
			return next()
		})
		.catch(err => next(err))
	return next();
}


module.exports = taskController
