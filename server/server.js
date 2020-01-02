const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const taskController = require('./controllers/taskController')
const authController = require('./controllers/authController')

const app = express()
const PORT = 3333;

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cookieParser())

app.use('/assets', express.static(path.resolve(__dirname, '../assets')));

app.get('/', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, '../views/index.html'));
  });

app.get('/secret', authController.verifyCokie,  (req, res) => {
res.status(200).sendFile(path.resolve(__dirname, '../views/secret.html'));
});

app.get('/tasks', taskController.getTasks, (req, res) => {
    res.status(200).json(res.locals.tasks)
})

app.post('/tasks', taskController.postTask, (req, res) => {
    res.status(200).json(res.locals.addedTask)
})

app.delete('/tasks', taskController.deleteTask, (req, res) => {
    res.status(200).json('Task Deleted')
})

app.post('/signin', authController.verifyUser, authController.setCookie, (req, res) => {
    res.redirect('/secret')
})

app.use('*', (req, res) => {
    res.status(404).send('File not Found')
})

app.use((err, req, res, next) => {
    res.status(500).send(`Internal server Error ${err}`)
})


app.listen(PORT, () => {
    console.log(`Listening from PORT ${PORT}`)
})