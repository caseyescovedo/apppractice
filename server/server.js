const express = require('express');
const app = express();
const path = require('path');
const authController = require("./controllers/authController.js");
const taskController = require("./controllers/taskController.js");
const cookieParser = require("cookie-parser")
const PORT = 3333;


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// =============== SERVE UP STATIC FILES =============== //
app.use(express.static(path.join(__dirname, '../assets')));


// =============== SERVE UP CSS =============== //
app.use("/style.css", (req, res, next) => {
  res
    .set({ "content-type": "text/css; charset=utf-8" })
    .status(200)
    .sendFile(path.resolve(__dirname, "../assets/css/style.css"));
});

// =============== SERVE UP MAIN APP =============== //
app.get('/',
  // authController.setCookie,
  (req, res) => {
    return res.status(200).sendFile(path.resolve(__dirname, '../views/index.html'));
  })

app.get('/tasks', taskController.getTasks, (req, res) => {
  return res.status(200).json(res.locals.tasks);
})

app.get('/secret', (req, res) => {
  return res.status(200).sendFile(path.resolve(__dirname, '../views/secret.html'));
})



// =============== CATCH ALL FOR UNDEFINED ENDPOINTS =============== //
app.use((req, res) => res.sendStatus(404)); // 404 NOT FOUND

// =============== GLOBAL ERROR HANDLER =============== //
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`)
});

module.exports = app;
