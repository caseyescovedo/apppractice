const cookieParser = require('cookie-parser');
const uuidv4 = require('uuid/v4');



const verifyUser = (req, res, next) => {
    const { username, password } = req.body;
    if (username !== "codesmith" && password !== "ilovetesting") {
        res.locals.verified = false;
        return next();
    } else {
        res.locals.verified = true;
        return next();
    }
}
const setCookie = (req, res, next) => {
    res.locals.sessionId = uuidv4();
    console.log("uuidv4", res.locals.sessionId);
    res.cookie('ssid', res.locals.sessionId, { http: false });
}

module.exports = {
    verifyUser,
    setCookie

};
