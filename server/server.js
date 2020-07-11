const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const taskRouter = require('./routes/tasks');
const authRouter = require('./routes/auth');

const PORT = 3333;
const app = express();

app.use(express.json({ extended: false }));
app.use(express.urlencoded({
  extended: true
}));
app.use('/', express.static(path.join(__dirname, '../assets')));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../views/index.html'));
});
app.get('/secret', (req, res) => {
  console.log('req.cookies', req.cookies);
  if (req.cookies.token === 'admin') {
    res.status(200).sendFile(path.join(__dirname, '../views/secret.html'));
  } else {
    res.status(401).send('You must be signed in to view this page');
  }
});

app.use('/tasks', taskRouter);
app.use('/signin', authRouter);

app.use('*', (req, res) => {
  res.status(404).send('Not Found');
});

app.use((err, req, res) => {
  console.log('Global error handler caught error: ', err);
  res.status(500).send('Internal Server Error');
});

app.listen(PORT, () => { console.log(`Listening on port ${PORT}...`); });

module.exports = app;
