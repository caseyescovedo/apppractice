const express = require('express');
const path = require('path')

const app = express();
const port = 3333;

app.use(express.json());
app.use(express.urlencoded({ extended: true}))
// app.use(cookieParser())

//SERVING STATIC FILES
app.use('/', express.static(path.join(__dirname, '../views')))
app.use('/', express.static(path.join(__dirname, '../assets')))
app.use('/secret', express.static(path.join(__dirname, '../assets')))

//SERVING INDEX
app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'))
})

//SERVING SECRET
app.get('/secret', (req,res) => {
  res.sendFile(path.join(__dirname, '../views/secret.html'))
})

//------------------------ROUTES-------------------------//



//DEFAULTS
app.use('*', (req, res) => {
  res.sendStatus(404)
});

app.use((err,req,res,next) => {
  console.log(err);
  res.sendStatus(500)
})

app.listen(port, () => console.log(`The server is listening on port:${port}`))