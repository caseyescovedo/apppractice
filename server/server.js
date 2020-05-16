const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');

const apiRouter = require('./routers/apiRouter');
const authController = require('./controllers/authController');

const app = express();
const port = 3333;

app.use(cookieParser(), express.json(), express.urlencoded({ extended: true }));

//separate router for api requests
app.use('/api', authController.verify, apiRouter);

//handle authentication flow
app.post('/signin', authController.authenticate, (req, res) => res.redirect('/secret.html'));
app.get('/secret.html', authController.verify);

//server static content
app.use('/', express.static(path.resolve(__dirname, '../views')));
app.use('/', express.static(path.resolve(__dirname, '../assets')));

//catch-all error handlers
app.use('/', (req, res) => res.status(404).send('Not Found'));
app.use((err, req, res, next) => {
  console.log(err);
  return res.status(500).send('Internal Server Error');
});

app.listen(port, () => console.log(`listening on port ${port}...`));