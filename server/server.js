const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 3333;
const path = require('path');
const cookieParser = require('cookie-parser');
const authController = require('./controllers/authController');
const taskController = require('./controllers/taskController');

app.use(cookieParser());
app.use(bodyParser.json());
//console.log((path.resolve(__dirname, "../assets"))); 
app.use(express.static(path.resolve(__dirname, "../assets"))); 

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../views/index.html'))
})

app.post('/', authController.verifyUser, (req, res) => {
  res.redirect('../views/secret.html')
})

app.post('/', authController.verifyUser, (req, res) => {
  const userToken = req.cookies['token'];
  if(userToken){
    res.sendFile(path.resolve(__dirname, '../views/secret.html'))
  }
  res.send('You must be signed in to view this page')
})

app.post('/secret', taskController.postTask, (req, res) => {
    res.sendFile(path.resolve(__dirname, '../views/secret.html'))
})

app.put('/secret', taskController.getTasks, (req, res) => {
  res.send('Made it to put route in secret')
})

app.delete('/secret', taskController.deleteTask, (req, res) => {
  res.send('Made it to the delete route in secret')
})

app.use((err, req, res, next) => {
    if(err){
        console.log(err);
    }
    else {
        res.status(500).send('Internal Service Error')
    }
})


app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`)
})

exports.module = app; 