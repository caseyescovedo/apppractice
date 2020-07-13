const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const { getTasks, postTask } = require('./controllers/taskController');

const app = express();

const taskRouter = express.Router();
const PORT = 3333;

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

taskRouter.post('/', postTask, (req, res) => {
  res.status(200).json(res.locals.task);
});
taskRouter.get('/', getTasks, (req, res) => {
  res.status(200).json(res.locals.foundTasks);
});
app.use('/task', taskRouter);

app.get('/secret', (req, res) =>
  res.status(200).sendFile(path.resolve(__dirname, '../views/secret.html'))
);
app.use('/css', (req, res) =>
  res.status(200).sendFile(path.resolve(__dirname, '../assets/css/style.css'))
);
app.use('/js', (req, res) =>
  res.status(200).sendFile(path.resolve(__dirname, '../assets/js/indes.js'))
);
app.get('/', (req, res) =>
  res.status(200).sendFile(path.resolve(__dirname, '../views/index.html'))
);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
