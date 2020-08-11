const authController = {};

authController.verifyUser = (req, res, next) => {
	// user of codesmith and a pass of ilovetesting.
	// redirect to the secret page route
	console.log(req.body)
	if (req.body.user === 'codesmith' && req.body.pass === 'ilovetesting') {
		return next();
	}
	return res.status(400).json('Unsuccessful Login Attempt');
};

authController.setCookie = (req, res, next) => {
	// set a cookie with a key of token and a value of admind
	res.cookie('token', 'admin');
	// return to the next middleware
	return next();
};

authController.verifyCookie = (req, res, next) => {
	// check for the valid cookie
	// If the cookie is not valid (or does not exist)
	if (req.cookies.token !== 'admin' || !req.cookies)
		return res.status(400).json('You must be signed in to view this page');
	return next();
};

module.exports = authController;
