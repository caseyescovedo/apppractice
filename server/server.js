const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const taskController = require('./controllers/taskController');

const app = express();
const PORT = 3333;

//Bodyparser Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const router = express.Router();

router.get('/',
  taskController.getTask,
  (req, res) => res.status(200).json(res.locals));

  router.post('/',
    taskController.postTask,
    (req, res) => res.status(200).json({item: res.locals.data}));

  router.delete('/:id',
    taskController.deleteTask,
    (req, res) => res.status(200).json({}));

app.use('/secret/api', router);

app.use('/js', express.static(path.join(__dirname, '../assets/js')));

app.use('/secret', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/secret.html'))
});
app.use('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'))
});

// catch-all route handler for any requests to an unknown route
app.use((req, res) => res.sendStatus(404));

// error handler
app.use((err, req, res, next) => {
    const defaultErr = {
      log: 'Express error handler caught unknown middleware error',
      status: 400,
      message: { err: 'An error occurred' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
  });


app.listen(PORT, () => console.log(`Listening at port ${PORT}...`));