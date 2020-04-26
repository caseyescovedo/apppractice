const express = require('express');
const path = require('path');
const app = express();

const PORT = 3333;

const taskController = require('./controllers/taskController')

app.use(express.json());

// serve static css and js files from assets folder
app.use(express.static(path.join(__dirname, '../assets'))) 

// serve the index.htmls file from views folder
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'));
});

// serve the secret file from views folder when visiting the /secret url
app.get('/secret', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/secret.html'))
});

// route to get tasks, sends all tasks back to client
app.get('/task', taskController.getTasks, (req, res) => {
  res.json(res.locals.data);
})

// route to post tasks, sends back new task to client
app.post('/task', taskController.postTask, (req, res) => {
  res.json(res.locals.data);
});

// route to delete tasks, with placeholder for id being passed in from request params
app.delete('/task:id', taskController.deleteTask, (req, res) => {
  res.json(res.locals.data);
})

// unkown route handler
app.use('*', (req, res)=> {
  res.sendStatus(404);
});

// global error handler
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send('Server Error');
});


app.listen(PORT, ()=> console.log(`Server listening at Port ${PORT}...`))

