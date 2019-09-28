const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const PORT = 3333;
const app = express();

// require in controllers
const authController = require('./controllers/authController');
const taskController = require('./controllers/taskController');

// parse request bodies for JSON
app.use(bodyParser.json());
// parse cookies
app.use(cookieParser());

// serve static files within the 'assets' folder
app.use(express.static('assets', {
  setHeaders: function(res, path, stat) {
    res.set('x-timestamp', Date.now())
  }
}))

// serve login page
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, './../views/index.html'));
})

// serve to-do page/app
app.get('/secret', (req, res) => {
  res.sendFile(path.resolve(__dirname, './../views/secret.html'))
}) 

// redirect to /secret when /signin form is submitted at /
// app.post('/sigin', (req, res) => {
//   res.redirect('/secret')
// })

// handler for posting a new item to db; middleware ends within taskController
app.post('/secret/items', taskController.postTask)

// handler for getting items from db
app.get('/secret/items', taskController.getTasks, (req, res) => {
  res.status(200).json(res.locals.items);
})

// handler for deleting an item from db
app.delete('/secret/items', taskController.deleteTask, (req, res) => {
  res.status(200).json(res.locals.items);
})

// catch-all handler for unknown routes
app.use('*', (req, res) => {
  res.status(404).send('Route was not found..');
})

// global error handler
app.use((err, req, res, next) => {
  let defaultErr = {
    log: 'caught unknown middleware',
    message: { err: 'an error occurred' }
  };
  let errObj = Object.assign(defaultErr, err);
  res.status(errObj.status).json(errObj.message);
})

// start server
app.listen(PORT, 
  () => console.log(`listening on port ${PORT}!`)
)