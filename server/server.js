const express = require('express');
const server = express();
const PORT = 3333;

const loginRouter = require('./routers/loginRouter');
const secretRouter = require('./routers/secretRouter');
const cookieParser = require('cookie-parser');

// parse incoming json ----------------------------------------------------
server.use(express.json());
// parse incoming cookies -------------------------------------------------
server.use(cookieParser());


//-------------------------------------------------------------------------
// route to the secret page -----------------------------------------------
server.use('/secret', secretRouter)
// route to the main page -------------------------------------------------
server.use('/', loginRouter)
// catch route to any other page, currently redundant because main route catches all
server.use('*', (req, res) => {
    res.status(400).json("Sorry that page does not exist.")
})
// global error handler, check if functional and right form ---------------
server.use((err, req, res, next) => {
    console.error(err);
})
// initialize server ------------------------------------------------------
server.listen(PORT, () => {
    console.log("Listening on port ", PORT);
})