const users = require('../models/UserModel');
const path = require('path');

const authController = {};

authController.verify = (req, res, next) => {
	const { user, pass } = req.body;
	if (!user || !pass) res.send('unsuccessful login attempt');
	try {
		users.findOne({ username: user })
			.then(resp => {
				if (resp.password === pass) {
					res.cookie('token', 'admin');
					res.redirect('/secret');
				}
				else res.json('unsuccessful login attempt')
			})
			.catch(err => res.json('unsuccessful login attempt'))
	} catch (error) {
		res.json('unsuccessful login attempt')
	}
};

authController.isLoggedIn = (req, res, next) => {
	if (req.cookies.token === 'admin') {
		return next();
	} else res.json('unsuccessful login attempt')
}

module.exports = authController;
