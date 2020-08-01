const authController = {};

authController.checkCredentials = (req, res, next) => {
	// console.log(req.body);
	const { user, pass } = req.body;
	if (user == 'codesmith' && pass == 'ilovetesting') {
		res.cookie('token', 'success');
		return next();
	} else {
		res.cookie('token', 'no-access');
		return next();
	}
};

authController.checkCookies = (req, res, next) => {
	// console.log(req.cookies);
	if (req.cookies.token) {
		const { token } = req.cookies;
		if (token == 'success') {
			return next();
		} else res.redirect('/notsuccess');
	}
};

module.exports = authController;
