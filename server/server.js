const express = require('express');
const app = express();
const PORT = 3333;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const taskController = require('./controllers/taskController');
const authController = require('./controllers/authController')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser())

app.use(express.static(path.join(__dirname, '../assets')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'))
})

// app.get('/secret', (req, res) => {
//     res.sendFile(path.join(__dirname, '../views/secret.html'))
// })

app.post('/addTask', taskController.addTask, (req, res) => {
    res.sendStatus(200);
})

app.post('/signin', authController.login, authController.addCookie, (req, res) => {
    res.sendFile(path.join(__dirname, '../views/secret.html'))
})

app.get('/getTasks', taskController.getTasks, (req, res) => {
    res.status(200).json(res.locals.items)
})

app.delete('/delete/:id', taskController.deleteTask, (req, res) => {
    res.sendStatus(200);
})

app.use('*', (req, res) => {
    res.sendStatus(400);
})

app.use((err, req, res, next) => {
    console.log(err)
})

app.listen(PORT, () => {
    console.log(`I am listening on ${PORT}`)
})