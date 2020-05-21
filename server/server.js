const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const taskRouter = require('./routes/taskRouter');
const authRouter = require('./routes/authRouter');
const secretRouter = require('./routes/secretRouter');

const app = express();
const PORT = 3333;

// parse req body
app.use(express.json());
app.use(express.urlencoded({ extended: 'true' }));
app.use(cookieParser());

// serve static files referenced in html
app.use(express.static('assets'));

// send html on root get
app.get('/',
  (req, res) => res.sendFile(path.resolve(__dirname, '../views/index.html')));

// send html on /secret get
app.use('/secret', secretRouter);

// route for database interaction
app.use('/tasks', taskRouter);

app.use('/signin', authRouter);

// catch-all route handler
app.use((req, res) => res.status(404).send('NOT FOUND'));

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
