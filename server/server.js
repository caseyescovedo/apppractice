const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const taskController = require('./controllers/taskController.js')
const authController = require('./controllers/authController.js')

const PORT = 3333;

// //connect to mongoose
mongoose.connect('mongodb+srv://assessment:123@nodeproject-o98p0.mongodb.net/test?retryWrites=true&w=majority', {useNewUrlParser: true})
console.log('here')
let db = mongoose.connection;
db.once('open', function(callback) {
  console.log("Connecting to Mongoose....");
})

//handle parsing request body
app.use(bodyParser.json());
app.use(cookieParser())
//handle requests for static files
app.use(express.static(path.join(__dirname, '/../assets')))

//serve index html on slash route
app.get('/', (req, res) => {
  const index = path.resolve(__dirname, '../views/index.html')
  return res.sendFile(index);
})

app.get('/test', taskController.getTasks)
app.post('/test', taskController.postTask);
app.delete('/test', taskController.deleteTask);
app.post('/signin', authController.verifyUser)
//serve secret html on /secret 
app.get('/secret', (req, res) => {
  const index = path.resolve(__dirname, '../views/secret.html')
  return res.sendFile(index);
})



app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`)
})