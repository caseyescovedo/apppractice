const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const port = 3333;
const taskController = require('./controllers/taskController');
const cookieParser = require('cookie-parser')

//cookies- refactor in controller
const checkCookie = (req,res,next) => {
    //need to check token (key) and admin (value) in here
    // console.log('req.cookies', req.cookies); 
    console.log('in checkCookie')
    if (req.cookies.token === 'admin') { //tried to do it with if (req.cookies.codesmith === 'hi'), but after clearing the cookie cache, i couldnt access 'hi' again
        return next();
    } else {
        res.send('You must be signed in to view this page')
    }
  }

//parse the body so we have access to it
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser())

//serve the whole assets file on load
app.use('/', express.static(path.join(__dirname, '../assets')));
app.use('/secret', express.static(path.join(__dirname, '../assets')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'))
})

//secret cookie route
app.get('/secret', checkCookie, (req, res) => {
    res.sendFile(path.join(__dirname, '../views/secret.html'))
})


//couldnt get it to work with controllers so put it in here
app.post('/signin', (req,res) => {
    // console.log('req.body', req.body)
    if (req.body.user === 'codesmith' && req.body.pass === "ilovetesting") {
      res.cookie('token', 'admin', {httpOnly: true})
      return res.redirect('/secret')
    }
    else {
      res.send('unsuccessful login attempt')
    }
  })

app.get('/get', taskController.getTask, (req, res, next) => { //why do i not have to do /secret/get, bot for delete i have to?
    console.log('res.locals.tasks',res.locals.tasks)
    res.status(200).json(res.locals.tasks);
})

app.post('/post', taskController.postTask, (req, res, next) => {
    console.log('returning from post')
    res.status(200).json(res.locals.task);
})

app.delete('/secret/delete/:id', taskController.deleteTask, (req, res, next) => {
    console.log('coming back from delete route')
    res.status(200).json(res.locals.task);
})

//global error
app.use((err, req, res, next) => {
    console.log('global error handler:', err);
    res.sendStatus(500);
})

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})