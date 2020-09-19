const express = require('express'); 
const app = express(); 
const path = require('path'); 
const PORT = 3333; 

//we're requiring in our taskController to use middleware on incoming requests
const taskController = require('./controllers/taskController')

app.use(express.static(path.join(__dirname, '../assets'))); 
app.use(express.json());
app.use(express.urlencoded({extended: true})); 

//i didn't have time to properly name my route, so i used /testDB
app.post('/testDB', taskController.postTask);
app.get('/testDB', taskController.getTasks);
app.delete('/testDB', taskController.deleteTask);

app.use('/secret', (req, res) => {
  res.status(222).sendFile(path.join(__dirname, '../views/secret.html'));
});


app.use('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../views/index.html'));
});


app.listen(PORT, () => {
  console.log(`listening on ${PORT}`); 
})