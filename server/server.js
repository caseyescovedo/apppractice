const express = require('express');

const app = express();
const { urlencoded } = require('express');
const path = require('path');
const taskRouter = require('./routers/taskRouter');

// define port as 3333
const PORT = 3333;

// parse all incoming JSON request bodies
app.use(express.json());
// handle form data correctly
app.use(express.urlencoded({ extended: true }));
// serve css and js files
app.use(express.static('assets'));

app.use('/task', taskRouter);
// serve secret.html request is made to '/secret'
app.use('/secret', (req, res) => res.type('html').sendFile(path.resolve(__dirname, '../views/secret.html')));

// serve index.html when request is made to '/'
app.use('/', (req, res) => res.type('html').sendFile(path.resolve(__dirname, '../views/index.html')));

// handle requests to unknown routes
app.use((req, res) => res.sendStatus(404));

// handle global errors in routes and middleware
app.use((err, req, res) => {
  const defaultErr = {
    log: 'Express error handler caught an unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errObj = { ...defaultErr, err };
  return res.status(errObj.status).json(errObj.message);
});

// end all server interactions with the server listening on our port
app.listen(PORT, () => {
  console.log(`Liiiiiistening on ${PORT}`);
});
