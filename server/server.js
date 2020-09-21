const express = require('express');
const app = express();

// auto parse reqs to json
app.use(express.json());
// use urlEncoded method
app.use(express.urlencoded());

// require router
const routes = require('./routes.js');
const authController = require('./controllers/authController');
// serve static files from both 'views' and 'assets' dirs
app.use(express.static('views'));
app.use(express.static('assets'));

app.post(
  '/signin',
  authController.verifyCredentials,
  authController.setCookie,
  (req, res) => res.redirect('/secret')
);
//route requests to secret endpoint to router
app.use('/secret', routes);

// send 404 when route is unknown
app.use('/', (req, res) => {
  res.sendStatus(404);
});

// global error handler
app.use((err, req, res, next) => {
  console.log(err);
});

// listen on 3333 and prepare for awesome
app.listen(3333, () => {
  console.log('Prepare for awesome.');
});
