const express = require('express');
const app = express();
const path = require('path');
const PORT =  3333;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('views'));

app.get('/secret', (req, res) => {
    res.status(200).set('Content-Type', 'text/html').sendFile(path.resolve(__dirname, '../views/secret.html'))
})

    



app.listen(PORT, ()=> {
    console.log(`you're listening on ${PORT}`)
})

module.exports = app;