const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const taskController = require('./controllers/taskController.js');


const app = express();
const PORT = 3333;

app.use(bodyParser.json());

app.get('../assets/css/style.css', (req, res) => {
    res.status(200).set({'content-type': 'text/css', charset: 'UTF-8'}).sendFile(path.resolve(__dirname, '../assets/css/style.css'));
})

app.use(express.static(path.resolve(__dirname, '../assets/css/style.css')));


app.get('/', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, '../views/index.html'))
});

app.get('/secret', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, '../views/secret.html'))
})

app.post('/task', taskController.postTask, (req, res) => {
    res.status(200);
})

app.get('/task', taskController.getTasks, (req, res) => {
    res.status(200).send(path.resolve(__dirname, '../views/secret.html'))
})

app.post('/task'), taskController.deleteTask, (req, res) => {
    res.status(200).send(path.resolve(__dirname, '../views/secret.html'))
}


app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`)
});