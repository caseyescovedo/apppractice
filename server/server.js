const express = require('express');
const app = express();
const PORT = 3333;
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const taskRouter = require('./routes/taskRouter');
const authController = require('./controllers/authController');


app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '../assets/')));



app.use('/secret', authController.verify, taskRouter);
app.get('/',(req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../views/index.html'));
});
app.post('/', (req, res, next) => {
  const {user, pass} = req.body;
  if ( user === 'codesmith' && pass === 'ilovetesting') {
    return res.redicret(taskRouter);
  } else {
    res.redirect('/');
  }
  
});
app.use('*', (req, res) => {
  return res.status(404).send('The page you are trying to find does not exist');
});

app.use((err, req, res, next) => {
  return res.status(400).send(`Internal server error: ${err}`);
});

app.listen(PORT, () => {console.log(`this server is listening to ${PORT}`)});
