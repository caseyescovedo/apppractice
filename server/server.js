const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 3333;

const taskController = require('./controllers/taskController.js');
const authController = require('./controllers/authController.js');

app.use(express.static(path.resolve(__dirname, '../assets')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../views/index.html'));
});

app.post('/signin',
  authController.checkUserPass,
  (req, res) => {
    res.redirect('/secret')
  }
)

app.get('/secret',
  authController.checkCookie,
  (req, res) => {
    res.sendFile(path.resolve(__dirname, '../views/secret.html'));
  }
);

app.get('/tasks', 
  taskController.getTasks,
  (req, res) => {
    const { tasks } = res.locals;
    res.send(tasks);
  }
)

app.post('/task', 
  taskController.postTask,
  (req, res) => {
    res.json(res.locals.addTask);
    // res.sendStatus(200);
  }
)

app.delete('/task',
  taskController.deleteTask,
  (req, res) => {
    res.sendStatus(200);
  }
)

app.use('*', (req, res) => {
  res.status(404).send('Page does not exist');
});

app.use((err, req, res, next) => {
  console.error('Error in server:', err);
  res.status(500).send('Internal server error');
})

app.listen(PORT, () => console.log(`Server listening on port ${PORT}...`));