const express = require('express')
const path = require('path');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 3333;
const authController = require('./controllers/authController');
const taskController = require('./controllers/taskController');

// body & cookie parsers
app.use(express.json());
app.use(cookieParser());

// statically serve css & index files (NOT WORKING, had to hardcode routes to them in the html files)
app.use('/assets', express.static(path.join(__dirname, '../assets')));

// directs to index.html
app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../views/index.html'));
})

// verifies username/password; sets cookies if user has been authenticated; redirects to secret page
app.post('/signin', authController.verifyAndSetCookie, (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../views/secret.html'));
});

// get request to retrieve todo list items from database & display data back to client
app.get('/secret', taskController.getTasks, (req, res) => {
  res.status(200).json(res.locals.data)
})

// post request which creates a new list item in the database
app.post('/secret', taskController.postTask, (req, res) => {
  res.status(200).json(res.locals.data)
})

// delete request to remove todo list item from database
app.delete('/secret', taskController.deleteTask, (req, res) => {
  res.status(200).json(res.locals.data)
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})