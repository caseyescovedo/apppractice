const express = require ('express');
const app = express();
const path = require ('path');
const bodyParser = require ('body-parser');
const cookieParser = require ('cookie-parser');

const PORT = 3333;

const taskController = require ('./controllers/taskController.js');
const authController = require ('./controllers/authController.js');

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/assets', express.static(path.join(__dirname, '../assets')));

app.get('/secret', authController.checkCookie, (req, res)=> {
  if (res.locals.verified === true) {
    res.status(200).sendFile(path.join(__dirname, '../views/secret.html'));
  } else {
    res.status(418).send('You must be signed in to view this page')
  }
})

app.post('/signin', authController.verifyUser, authController.setCookie, (req, res)=> {
  if (res.locals.verified === true) {
  res.status(200).sendFile(path.join(__dirname, '../views/secret.html'));
  } else {
    res.status(418).send('unsuccessful login attempt')
  }
})

app.get('/tasks', taskController.getTasks, (req, res)=> {
  res.status(200).send(res.locals.tasks)
  
})

app.post('/task', taskController.postTask, (req, res)=> {
  res.status(200).send(res.locals.tasks);
})

app.delete('/task', taskController.deleteTask, (req, res)=> {
  
})

app.get('/', (req, res)=> {
  res.status(200).sendFile(path.join(__dirname, '../views/index.html'));
})

app.use('*', (req, res) => {
  res.status(404).send('Unfortunately that directory is not found...')
})
app.listen(PORT, ()=> {
  console.log(`Server listing at port: ${PORT}...`)
})