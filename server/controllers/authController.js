
const authController = {};

authController.verifyLogin = (req, res, next) => {
	const { username, password } = req.body;
	if (username === 'codesmith' && password === 'ilovetesting') {
		res.locals.verify = {success: true}
	}
	else {
		res.locals.verify = {success: false}
	}
	return next()
}

authController.setCookie = (req, res, next) => {
	if (res.locals.verify.success === true) {
		res.cookie('token', 'admin')
	}
	return next()
}

authController.verifyCookie = (req, res, next) => {
	if (req.cookies.token && req.cookies.token === 'admin') {
		return next()
	} 
	res.status(400).send('You must be signed in to view this page')
}

module.exports = authController;
