const express = require('express');
const app = express(); // initialize express
const path = require('path');
const db = require('./models/TaskModel.js');
const taskController = require('./controllers/taskController.js');

app.use(express.json()); // use this instead of body-parser?

// serve static files in 'views' and 'assets' directories
app.use(express.static('views'));
// app.use(express.static('assets'));
app.use(express.static('assets', {
  setHeaders: (res, path) => {
    if (path.endsWith('.css')) res.setHeader('Content-Type', 'text/css');       // unnecessary in Express?
    if (path.endsWith('.js')) res.setHeader('Content-Type', 'text/javascript')
  }
}));

// serve secret.html
app.get('/secret', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../views/secret.html'));
});

app.get('/tasks', taskController.getTasks, (req, res, next) => {

  res.status(200).json(res.locals.allTasks);
});

// serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../views/index.html'));
});


// flow test
app.use((req, res, next) => {
  console.log(`
    ******** FLOW TEST ********
    req.method: ${req.method},
    req.url: ${req.url},
    req.body (stringified): ${JSON.stringify(req.body)}
  `);
  return next();
});

app.listen(3333, () => {
  console.log('listening on 3333...')
})