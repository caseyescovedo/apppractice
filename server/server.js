const express = require("express");
const app = express();
const path = require("path");
const PORT = 3333;

const taskController = require('./controllers/taskController')

app.use(express.static(path.join(__dirname, '../assets')), mon

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'))    
});

app.get('/secret', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/secret.html'))
})


app.post('/task/getdata', taskController.postTask, (req, res) => {
    res.status(200).json(res.locals.tasks);
});

app.post('/task/create', taskController.postTask, (req, res) => {
    res.status(200).json(res.locals.task);
});


app.post('/task/delete', taskController.postTask, (req, res) => {
    res.sendStatus(200);
})


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
