const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const taskController = require('./controllers/taskController')

const app = express()
const PORT = 3333;

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())


app.use('/assets', express.static(path.resolve(__dirname, '../assets')));

app.get('/', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, '../views/index.html'));
  });

app.get('/secret', (req, res) => {
res.status(200).sendFile(path.resolve(__dirname, '../views/secret.html'));
});

app.get('/tasks', taskController.getTasks, (req, res) => {
    res.status(200).json(res.locals.tasks)
})

app.post('/tasks', taskController.postTask, (req, res) => {
    res.status(200).json('Task Updated')
})

app.delete('/tasks', taskController.deleteTask, (req, res) => {
    res.status(200).json('Task Deleted')
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