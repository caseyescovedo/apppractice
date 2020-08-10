module.exports = {
	checkCred: function(req, res, next) {
		try {
			if (req.body.user === 'codesmith' && req.body.pass === 'ilovetesting') {
				return next();
			} else {
				return console.log('unsuccessful login attempt');
			}
		} catch (error) {
			console.log(error);
			return next(error);
		}
	},
	setCookie: function(req, res, next) {
		try {
			res.cookie('token', 'admin');
			console.log('Set cookie!');
			return next();
		} catch (error) {
			console.log(error);
			return next(error);
		}
	},
	checkCookie: function(req, res, next) {
		try {
			let cookieString = req.headers.cookie;
			if (cookieString.includes('token=admin')) {
				return next();
			} else {
				return console.log('You must be signed in to view this page.');
			}
		} catch (error) {
			console.log(error);
			return next(error);
		}
	}
};
