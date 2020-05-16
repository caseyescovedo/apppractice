const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const taskController = require('./controllers/taskController');
const authController = require('./controllers/authController');

const PORT = 3333;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use('*/js', express.static(path.join(__dirname, '../assets/js')));
app.use(express.static(path.join(__dirname, '../assets')));

app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../views/index.html'));
});

app.use('/secret', authController.checkCookie, (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../views/secret.html'));
});

app.use('/signin', authController.verifyUser, authController.checkCookie, (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../views/secret.html'));
});

app.use('/tasks/get/:user', 
  taskController.getTasks, 
  (req, res) => {
  return res.status(200).send(res.locals.allTasks);
});

app.use('/tasks/add', 
  taskController.postTask, 
  (req, res) => {
    console.log(req.body);
    return res.status(200).send(res.locals.newestItem);
});

app.use('/tasks/remove', 
  taskController.deleteTask,
  (req, res) => {
    console.log(req.body);
    return res.status(200).send({message: 'item deleted'});
});


// app.get(
//   '/signup',
//   queryController.createUser,
//   queryController.findUser,
//   (req, res) => {
//     return res
//       .status(200)
//       .sendFile(path.join(__dirname, '../client/secret.html'));
//   }
// );

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Error occurred in Express middleware',
    status: 400,
    message: { error: `The following error occurred: ${err}` },
  }
  const errorObj = { ...defaultErr, err };
  return res.status(errorObj.status).send(errorObj);
});


app.listen(PORT, () => {
  console.log('Listening on port 3333');
});
