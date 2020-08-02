const { User } = require('../models/TaskModel');
const jwt = require('jsonwebtoken');

const authController = {}

authController.signIn = async (req, res, next) => {
	let user = 	User.findOne({ username: req.body })
	user.compare()
	// User.findOne({ username: req.body })
	// 	.then(user => {
	// 		res.cookie("ssid", )
	// 		res.locals.user = user
	// 	})
	// 	return next();
}

authController.signToken = (req, res, next) => {
	const token = jwt.sign(res.locals.user, process.env.JWT_SECRET, { // JWT_SECRET is just "secret"
    expiresIn: 3600
	});
	res.cookie('token', token, {
		secure: false, // set to true if your using https
		httpOnly: true, // cannot be accessed through JS
	});
	return next();
}

authController.verifyToken = (req, res, next) => {
	const token = req.cookies.token || "";
	if (!token) {
		return res.status(401).json('You need to Login')
  }
	jwt.verify(token, process.env.JWT_SECRET, (err, { username }) => {
		if(err) return next(err)
		req.user = { username };
		return next();
	})
}

module.exports = authController
