const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = 3333;

const taskController = require('./controllers/taskController');

app.use(express.json());

// serve index file upon get requests to /
app.get('/', (req, res) => {
   return res.sendFile(path.resolve(__dirname, '../views/index.html'));
});

app.get('/secret', (req, res) => {
    return res.sendFile(path.resolve(__dirname, '../views/secret.html'));
})

app.use(express.static(path.resolve(__dirname, '../assets')));

app.post('/test', taskController.postTask, (req, res) => res.send('hi'))


app.get('/test', taskController.getTasks, (req, res) => res.send('hey'));





app.listen(PORT, () => console.log(`server listening on port ${PORT}`));
