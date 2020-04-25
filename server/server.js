const express = require('express');
const app = express();
const path = require('path');

const PORT = 3333;

// Require routes
const taskRouter = require('./routes/taskRouter.js');

// Body parser
// app.use(express.json);

// Serve static files
app.use('/', express.static(path.resolve(__dirname, '../assets')));

// Serve main page
app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../views/index.html'));
});

// Serve secret page
app.get('/secret', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../views/secret.html'));
});

// Handle routes
app.use('/task', taskRouter);

// Handle bad routes
app.use((req, res) => {
  res.sendStatus(404);
});

// Global error handler
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json(err);
});


app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;