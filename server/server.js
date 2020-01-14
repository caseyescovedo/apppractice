const express = require('express');
const path = require('path');
const app = express();
const taskController = require('./controllers/taskController')
const PORT = 3333;
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
// const taskRouter = require( './routes/taskRouter');

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
const authController = require('./controllers/authController')


app.use('/', express.static(path.join(__dirname, '../assets')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'))
})

app.post('/addTask', taskController.addTask, (req, res) => {
    console.log('after adding task in server')
    res.status(200).send('it worked?')
})
app.post('/signin', authController.checkUser, (req, res) => {
    console.log('after adding task in server')
    res.status(200).sendFile(path.join(__dirname, '../views/secret.html'))
})
app.get('/getTasks', taskController.getTasks, (req, res) => {
    console.log('in server getTasks');
    res.status(200).send(res.locals.tasks)
})
app.delete('/deleteTask', taskController.deleteTask, (req, res) => {
    console.log('after adding task in server')
    res.status(200).send('deleted')
})

app.get('/secret', authController.checkCookie, (req, res) => {
    res.sendFile(path.join(__dirname, '../views/secret.html'))
})
app.get('*', (req, res) => {
    res.sendStatus(404);
})



app.listen(PORT, ()=> {console.log('Listening at Port:', PORT)})