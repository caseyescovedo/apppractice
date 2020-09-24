const express = require('express');
const app = express();
const path = require('path')
const cors = require('cors');
const apiRouter = require('./routes/routes.js')
const authController = require('./controllers/authController.js')
const cookieParser = require('cookie-parser');

const PORT = 3333;

// parses cookies
app.use(cookieParser())
// prevents cors errors
app.use(cors());
// require all interactions to use/parse JSON
app.use(express.json());
// handles form data correctly
app.use(express.urlencoded({ extended: true }));

// serves static files
app.use(express.static('assets'));

// serves '/' route
app.get('/', (req, res) =>
  res.status(200).sendFile(path.resolve(__dirname, '../views/index.html'))
);

// serves '/secret' route
app.get('/secret', authController.cookieCheck, (req, res) =>
  res.status(200).sendFile(path.resolve(__dirname, '../views/secret.html'))
);

// serves '/api' route
app.use('/api', apiRouter);

// serves '/signin' route
app.post('/signin', authController.credCheck);

// 404 handler
app.use("*", (req, res) => {
 res.status(404).send("Page Not Found");
});

// global error handler
app.use((err, req, res, next) => {
  console.log(err);
  return res.status(500).send('"Internal Server Error"');
});

app.listen(PORT, () => {
  console.log('The app is listening on ' + PORT);
})