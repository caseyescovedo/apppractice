const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

//import controller to use as middleware.
const taskController = require('./controllers/taskController');

// Port variable at which the server will listen.
const PORT = 3333;


const app = express();

//parse bodies of incoming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


// serves static files within the assets file.
//make sure Content-Type is properly set in the HTTP response.
app.use('/', express.static('assets'));

//REFACTOR IDEA -> Creater a router instance and use the router to handle different request methods.
app.post('/secret/api', taskController.postTask, (req, res) => {
  if(res.locals.result instanceof Error) {
    //if the result is an Error then we'll send back a sorry message.
    res.status(200).json('Sorry. Could not post task at this moment. If problem persists, contact website administrator.');
  } else {
    // Sends to the client the new row that was created in the database.
    res.status(200).json(res.locals.result);
  }
});

app.get('/secret/api', taskController.getTasks, (req, res) => {
  if(res.locals.result instanceof Error) {
    // if the result is an Error then we'll send back a sorry message.
    res.status(200).json('Sorry. Could not retrieve tasks at this moment. If problem persists, contact website administrator.');
  } else {
    // sends an json object to the clinet. This JSON object will be an array of object.
    res.status(200).json(res.locals.result);
  }
});

app.get('/secret', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../views/secret.html'));
});

app.get('/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../views/index.html'));
});


app.listen(PORT, () => console.log(`Listening on port ${PORT}.`));