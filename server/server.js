const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const Task = require('./models/TaskModel');
const mainRouter = require('./routers/mainRouter');
const secretRouter = require('./routers/secretRouter');
const dbRouter = require('./routers/dbRouter');
const authRouter = require('./routers/authRouter');
const app = express();
const PORT = 3333;

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('assets'));

app.use('/', mainRouter);
app.use('/secret', secretRouter);
app.use('/tasks', dbRouter);
app.use('/signin', authRouter);

app.use((req, res) => {
  res.status(404).json({
    message: 'Page not found',
  });
});

app.use((err, req, res) => {
  const defaultErr = {
    status: 500,
    message: 'Default error message',
  };

  const errObj = {
    ...defaultErr,
    ...err,
  };

  return res.status(errObj.status).send(errObj.message);
});

app.listen(PORT, () => {
  console.log('listening on ' + PORT);
});
