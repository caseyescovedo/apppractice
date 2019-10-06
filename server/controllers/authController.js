const verifyUser = (req, res, next) => {
	console.log(req.body);
	if (req.body.user === "codesmith" && req.body.pass === "ilovetesting") {
		return next();
	}
	res.json("unsuccessful login attempt");
};
const addCookieController = (req, res, next) => {
	res.cookie("token", "admin");
	return next();
};
const checkForCookie = (req, res, next) => {
	if (req.cookies.token === "admin") {
		return next();
	}
	return res.send("You must be signed in to view this page");
};
module.exports = {
	verifyUser,
	addCookieController,
	checkForCookie
};
