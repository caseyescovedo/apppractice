const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

const port = 3333;

const taskController = require('./controllers/taskController')

app.use(express.static(path.join(__dirname, '/../assets')))
app.use(bodyParser.json());

app.get('/', (req, res) => {
  const index = path.resolve(__dirname, '../views/index.html');
  return res.status(200).sendFile(index);
})

app.get('/secret', (req, res) => {
  const secret = path.resolve(__dirname, '../views/secret.html');
  return res.status(200).sendFile(secret);
})

app.get('/getTasks', taskController.getTasks)

app.post('/addTask', taskController.postTask)


app.listen(port, () => console.log(`Listening on PORT: ${port}`));