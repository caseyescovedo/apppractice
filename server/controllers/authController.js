const Task = require('../models/TaskModel')

const authController = {}

authController.createUser = async (req, res, next) => {
	const { username, password } = req.body;
	try {
		const newuser = await Task.create({ username, password })
		res.locals.newuser = newuser
		//create is an object with unique id, username, password, and initial empty todo array
		next();
	} catch (err) {
		console.log('this is error in create user: ', err)
		// next(err);
	}
};

authController.verifyUser = (req, res, next) => {

	const { username, password } = req.body

	const isUserName = Task.findOne({ username }).select("username").lean();
	const isPassWord = Task.findOne({ password }).select("password").lean();
	if (isUserName && isPassWord) {
		return next()
	}
};


module.exports = authController
