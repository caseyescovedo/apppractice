const express = require('express');
const app = express();
const path = require('path');
const PORT = 3333;

const taskController = require('./controllers/taskController.js');

// The middleware that parses incoming requests with JSON payloads 
app.use(express.json());

app.use(express.urlencoded({extended: true}));

// Serving the login html page:
app.get('/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../views/index.html'))
});

// Serving static assets:
  // Make sure the Content-Type header is getting properly set in the HTTP response. 
  // (Some methods from some frameworks infer the content type from the file extension and set the header automatically.)
app.use('/css', express.static(path.resolve(__dirname, '../assets/css')));
app.use('/js', express.static(path.resolve(__dirname, '../assets/js')));

// Rendering secret html page:
app.get('/secret', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../views/secret.html'))
});

// Routing the POST req:
app.post('/task', 
  taskController.postTask,
  (req, res) => {
    // Sends back the successfully added task's item string.
    res.status(200).json(res.locals.postedTask);
  }
);

// Routing the GET req for all tasks in db:
app.get('/task',
  taskController.getTasks,
  (req, res) => {
    // Sends back the successfully fetched tasks (all) from db.
    res.status(200).json(res.locals.allTasks);
  }
);

// Routing the DELETE req:
  // Receiving the task id in req.params
app.delete('/task/:id',
  taskController.deleteTask,
  (req, res) => {
    res.status(200).json(res.locals.deletedItem);
  }
)

// Catch-all route handler:
app.use('*', (req, res) => res.sendStatus(400));

// Global error handler:
app.use((err, req, res, next) => {
  const defaultErr = {
    status: 500,
    log: 'An error occured.',
    message: 'Error occured in middleware.',
  };
  
  const newErr = Object.assign({}, defaultErr, err);
  
  console.log(newErr.message);
  
  res.status(defaultErr.status).send(newErr.message);
})

app.listen(PORT, () => console.log(`Server started. Listening on ${PORT}...`));