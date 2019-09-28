const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');

const taskController = require('../server/controllers/taskController');
const authController = require('../server/controllers/authController');

const PORT = 3333;
app.use(bodyParser.json());
//to see the HTTP data in key value pairs, coming from the form submission
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../assets')));

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, '../views/index.html'));
})
//authController.checkIfCookieExists,
app.get('/secret', authController.checkIfCookieExists,(req, res)=>{
    if (res.locals.cookiesExist){
        res.sendFile(path.join(__dirname, '../views/secret.html'));
    } else {
        res.send('You must be signed in to view this page');
    }
})
//authController.checkIfCookieExists, authController.validate, authController.sendCookie,

app.post('/signin', authController.validate, authController.sendCookie, (req, res)=>{
    if (res.locals.validated){
        res.redirect('/secret');
    } else {
        res.send('unsuccessful login attempt');
    }
})

app.get('/getItems', taskController.getTasks, (req, res)=>{
    res.json({getTasks: res.locals.getTasks});
})
app.post('/postTask', taskController.postTask,  taskController.getTasks,(req, res)=>{
    app.render('/getItems')
})
app.post('/deleteTask', taskController.deleteTask, (req, res)=>{
    console.log(res.locals.deleted)
})


app.use((err, req, res,next)=>{
    console.log(err + 'in global error handler server.js file');
})

app.listen(PORT, ()=>{
    console.log('lisTeNiNg On Port 3333');
})