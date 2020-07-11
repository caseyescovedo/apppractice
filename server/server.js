const express = require('express')
const app = express()
const port = 3333;
const path = require('path');
// app.get('/', (req, res) => res.send('Hello World!'))
app.use(express.static('.'))
app.use(express.static('./assets'))

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../views/index.html'));
  res.status(200)
})


app.get('/secret', function(req, res) {  
  res.sendFile(path.join(__dirname, '../views/secret.html'));
  res.status(200)
})




app.listen(port, () => console.log(`Listening on Port ${port}`))
