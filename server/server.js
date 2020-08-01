const express = require('express');
const app = express();
const path = require('path');
const dbRouter = require('./routes/db');
const authRouter = require('./routes/auth');
const cookieParser = require('cookie-parser');
const PORT = 3333;

const { checkCookie } = require('./controllers/authController');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(path.resolve(__dirname, '../views')));
app.use(express.static(path.resolve(__dirname, '../assets')));

app.get('/secret', checkCookie, (req, res, next) =>
  res.sendFile(path.resolve(__dirname, '../views/secret.html'))
);

app.use('/signin', authRouter);
app.use('/api/db', dbRouter);

app.use((req, res, next) => {
  return res.status(404).send('PAGE NOT FOUND OH NO');
});

app.use((err, req, res, next) => {
  console.log(err);
  return res.status(400).send('SERVER BROKE OH NO');
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
