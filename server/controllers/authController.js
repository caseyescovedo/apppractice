
const verifyCredentials = (req, res, next) => {
    // write code here
    console.log("Body ", req.body);
    console.log("request ", req);
    const { user, pass } = req.body;
    // lookup for a match
    if (user === 'codesmith' && pass === 'ilovetesting') {
        console.log('Matching credentials!');
        // let the request continue if the user and password is correct
        return next();
    }
    // redirect to login page
    return res.send("unsuccessful login attempt");
}

const setLoginCookie = (req, res, next) => {
    // write code here
    const options = { httpOnly: true };
    res.cookie('token', 'admin', options);
    next();
}

const isLoggedIn = (req, res, next) => {       
    if (req.cookies.token !== 'admin') {
        return res.send("You must be signed in to view this page");
    } else {      
        next();      
    }    
};

module.exports = {
    verifyCredentials,
    setLoginCookie,
    isLoggedIn
};
