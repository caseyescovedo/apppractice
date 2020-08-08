const express = require('express');
const app = express()
const path = require('path');
const taskController = require('./controllers/taskController');

app.use(express.json());

app.get('*', express.static(path.join(__dirname, '../assets')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'))
})

app.get('/secret', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/secret.html'))
})

app.get('/tasks', taskController.getTasks, (req, res) => {
    return res.status(200).json(res.locals.task)
})

app.post('/tasks', taskController.postTask, (req, res) => {
    return res.status(200).json(res.locals.task)
})

app.delete('/tasks/:id', taskController.deleteTask, (req, res) => {
    return res.status(200)
})

app.listen(3333, () => console.log('Listening on port 3333'))