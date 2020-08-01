const express = require('express');
const path = require('path')
const app = express();
// const Task = require('./models/TaskModel.js')
const taskController = require('./controllers/taskController.js');


const PORT = 3333;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//TODO: setheaders
app.use('/css', express.static(path.join(__dirname, '../assets/css')));
app.use('/js', express.static(path.join(__dirname, '../assets/js')));


app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../views/index.html'));
});

app.get('/secret', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../views/secret.html'));
});


app.post('/task', taskController.postTask, (req, res) => {
  res.status(200).json(res.locals.data);
});

app.get('/task', taskController.getTasks, (req, res) => {
  res.status(200).json(res.locals.data);
})

app.delete('/task/:id', taskController.deleteTask, (req, res) => {
  res.status(200).json(res.locals.data);
})

app.use('*', (req, res) => {
  res.status(404).send("Bad Request");
})

app.use((err, req, res, next) => {
  res.status(500).send(err);
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`))