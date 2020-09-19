const express = require('express');
const app = express();
const pool = require('./models/TaskModel');
const path = require('path');
const PORT = 3333; // README instruction
const authRouter = require('./routers/authRouter');
const taskRouter = require('./routers/taskRouter');
const authController = require('./controllers/authController');

// use/parse JSON for all server interactions
app.use(express.json());
// handle form data
app.use(express.urlencoded({ extended: true }));
// serve static files
app.use(express.static('assets'));

// root
app.get('/', (req, res) =>
  res.status(200).sendFile(path.resolve(__dirname, '../views/index.html'))
);

// login
// app.post('/', authController.verifyUser, authController.setCookie, (req, res)) => {}

// secrete
app.get('/secret', (req, res) =>
  res.status(200).sendFile(path.resolve(__dirname, '../views/secret.html'))
);
// CRUD at secret
app.use('/api', taskRouter);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).send('Not Found');
});

// global err handler
app.use((err, req, res, next) => {
  console.log('global err', err);
  res.status(500).send('Internal Server Error');
});

// HTTP server listening at PORT
app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
