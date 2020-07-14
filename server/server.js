const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');

const taskRouter = require('./routes/tasks');

const authController = require('./controllers/authController');

const app = express();
app.use(cookieParser());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.use('/tasks', taskRouter);

app.post(
  '/signin',
  authController.verifyAccount,
  authController.setCookie,
  (req, res) => {
    res.redirect('/secret');
  }
);

app.get('/css/:name', (req, res, next) => {
  const options = {
    root: path.join(__dirname, '..', 'assets', 'css'),
    dotfiles: 'deny',
    headers: {
      'Content-Type': 'text/css; charset=UTF-8',
    },
  };

  const fileName = req.params.name;

  res.sendFile(`${fileName}`, options, function (err) {
    if (err) {
      next(err);
    } else {
      console.log('style file sent!');
    }
  });
});

app.get('/js/:name', (req, res, next) => {
  const options = {
    root: path.join(__dirname, '..', 'assets', 'js'),
    dotfiles: 'deny',
    headers: {
      'Content-Type': 'text/javascript; charset=UTF-8',
    },
  };

  const fileName = req.params.name;

  res.sendFile(`${fileName}`, options, function (err) {
    if (err) {
      next(err);
    } else {
      console.log('js file sent!');
    }
  });
});

// app.get('/:name', (req, res, next) => {
//   const options = {
//     root: path.join(__dirname, '..', 'views'),
//     dotfiles: 'deny',
//     headers: {
//       'Content-Type': 'text/html; charset=UTF-8',
//     },
//   };

//   const fileName = req.params.name;

//   res.sendFile(`${fileName}.html`, options, function (err) {
//     if (err) {
//       next(err);
//     } else {
//       console.log('File sent!');
//     }
//   });
// });

app.get('/secret', authController.verifyCookie, (req, res) => {
  console.log('got ehre too');
  res.sendFile(path.join(__dirname, '..', 'views', 'secret.html'));
});

app.use(
  express.static('views', {
    extensions: ['html'],
  })
);

app.use((req, res) => {
  res.status(404).send('File not found');
});

app.use((err, req, res, next) => {
  res.status(500).send('Caught Error');
});

app.listen(3333, () => {
  console.log('server is running');
});
