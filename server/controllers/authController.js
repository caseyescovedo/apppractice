module.exports = {

    cookieController: (req, res, err) => {
        const {login, password} = req.body;
        if (login === 'codesmith' && password === 'ilovetesting') res.cookie({'token' : 'admin'});
        //line 5 is definitely not correct. Probably not even in the ballpark. 
        else res.json('unsuccessful login attempt');
    }

};
