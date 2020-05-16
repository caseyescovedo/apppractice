const express = require('express');
const path = require('path');
const { taskController } = require('./controllers/taskController')
const { authController } = require('./controllers/authController')
const app = express();
const port = 3333;

// this has to be before post or it will not work
// I thought use runs in first pass. I guess not.
// for displaying json
app.use(express.json());
// for display xxx-form-urlencoded
app.use(express.urlencoded());


// When you visit http://localhost:3333/ in the browser, it should serve the index.html file from the views folder
app.get('/', (req, res) => res.sendFile(path.resolve(__dirname, "../views/index.html")))

// When you visit http://localhost:3333/secret in the browser, you should render the secret.html file from the views folder
app.get('/secret', (req, res) => res.sendFile(path.resolve(__dirname, "../views/secret.html")))

app.post('/postTask', taskController.postTask, (req, res) => res.status(200).json(res.locals.task));

app.get('/getTasks', taskController.getTasks, (req, res) => res.status(200).json(res.locals.tasks));

app.delete('/deleteTask/:id', taskController.deleteTask, (req, res) => res.status(200).json(res.locals.task));

app.post('/signin', authController.verifyUser, (req, res) => res.redirect("/secret"))

//  You should also serve the CSS and JS that the html files are requesting. These are located in the assets folder.
app.use(express.static(path.resolve(__dirname, "../assets")))



// Default error handler.
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
  })

app.listen(port, () => console.log(`app listening at http://localhost:${port}`))