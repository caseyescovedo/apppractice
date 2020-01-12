const cookieController = {};

cookieController.setCookie = (req, res, next) => {
    res.cookie('user', 'codesmith');
    res.cookie('pass', 'ilovetesting');
    return next();
}

module.exports = cookieController;
