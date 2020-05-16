const express = require('express');
const path = require('path');
const taskController = require('./controllers/taskController');

const app = express();

const PORT = 3333;
app.use(express.json());
app.use(express.urlencoded());

app.use(express.static(path.resolve(__dirname, '../assets')));

app.get('/secret', (req, res) => 
res.status(200).sendFile(path.resolve(__dirname, '../views/secret.html'))
);

app.get('/', (req, res) => 
res.status(200).sendFile(path.resolve(__dirname, '../views/index.html'))
);

app.post('/api/secret', taskController.postTask, (req, res) => 
res.status(200).send(console.log('Task has been added'))
);

app.get('/api/secret', taskController.getTasks, (req, res) => 
res.status(200).json(res.locals.tasks)
);

app.delete('/api/secret', taskController.deleteTask, (req, res) => 
res.status(200).send(console.log('task has been deleted'))
);

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'An error has occurred',
    status: 400,
    message: {err: 'An error has occurred on the server'}
  };
  const errorObj = Object.assign({}, defaultErr, err);
  res.status(errorObj.status).json(errorObj.message);
})

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));