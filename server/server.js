const path = require('path');
const express = require('express');

// Create a Node.js HTTP server that listens on port 3333.
const app = express();
const PORT = 3333;

// You should serve the CSS and JS that the html files are requesting.
// These are located in the assets folder.
app.use('/assets', express.static(path.join(__dirname, '../assets')));

// When you visit http://localhost:3333/ in the browser,
// it should serve the index.html file from the views folder.
// This is the login page for the application.
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'));
});

/* When the sign in form is submitted, it should redirect to the secret page route.
// This should not be done with AJAX.
app.post(
  '/',
  authController.createUser,
  authController.setSSIDCookie,
  (req, res) => {
    res.redirect('/secret');
  }
);
*/

// When you visit http://localhost:3333/secret in the browser,
// you should render the secret.html file from the views folder.
// This is the To-Do application.
// Check for the valid cookie before sending the secret page.
// If the cookie is not valid (or does not exist),
// send back the string You must be signed in to view this page.
app.get('/secret', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/secret.html'));
});

// create the routes to tie the client-side JavaScript events
// to the appropriate database functions

// const taskController = require('./controllers/taskController.js');
// const router = express.Router();
// module.exports = router;

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
