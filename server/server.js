const express = require('express');
const path = require('path');
const PORT = 3333; //listen here
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const taskController = require('./controllers/taskController.js');
const authController = require('./controllers/authController.js');
//body parser now built into express
app.use(express.json());

//first thing we must do is serve up static files
//css styling is in assets folder
app.use(express.static('assets'));

//use cookieParser
app.use(cookieParser);

//now send our static html file
app.get('/', (req, res)=>{
    res.sendFile(path.resolve(__dirname, '../views/index.html'));
})



//getting all tasks from database
app.get('/todo', taskController.getAllTasks, (req, res)=>{
    res.status(200).json(res.locals.allTasks);
})

//inserting task into database then receiving all tasks in updated db
app.post('/todo', taskController.createTask, taskController.getAllTasks, (req, res)=>{
    res.status(200).json(res.locals.allTasks);
})

//delete from database
app.delete('/todo', taskController.deleteTask, taskController.getAllTasks, (req, res)=>{
    res.status(200).json(res.locals.allTasks);
})

//signup rote
// app.post('/signUp', authController.newUser, authController.setCookie, (req, res) =>{
//     res.sendStatus(200);
// })

//route error handler
app.use((req, res, next)=>{
    res.sendStatus(404);
})

//global middleware error handler
app.use((err, req, res, next)=>{
    const defaultError = {
        log: 'Express caught unknown middleware error',
        status: 404,
        message: {err: 'error in middelware'}
    }
    //create error object that will take on specific middleware errors and replace the default error
    const errorObj = Object.assign(defaultError, err);
    console.log(errorObj);
    res.status(errObj.status).json(errObj.message);
})



//app.listen on specified port
app.listen(PORT, ()=>{
    console.log('Listening on port: ', PORT);
})