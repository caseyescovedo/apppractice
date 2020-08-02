const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const path = require('path');
const { signIn, signToken, verifyToken } = require('./controllers/authController');
const { addTask, getTasks } = require('./controllers/taskController')
const bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())

app.use('/css', express.static(path.join(__dirname, '../assets/css')));

app.get('/', (req, res, next) => {
	res.sendFile(path.join(__dirname, '../views/index.html'), err => {
		if(err) next(err)
	})
});

// app.post('/', signIn, signToken, (req, res, next) => {
// 	res.json({ success: "true" })
// });

app.get('/secret', getTasks, (req, res ,next) => {
	// res.sendFile(path.join(__dirname, '../views/secret.html'), err => {
	// 	if(err) next(err)
	// })
	res.json(res.locals.tasks)
})

app.post('/secret', addTask, (req, res ,next) => {
	console.log('hello')
	res.json({success: true})
	// res.json({tasks: res.locals.tasks})
})

app.use('*', (req, res, next) => next({
		log: 'Page is not found',
		status: 404,
		message: { err: 'Page is not found' },
	})
);

app.use((err, req, res, next) => {
		//respond w 404 error message
	const defaultError = {
		log: 'Express error handler caught unknown middleware error',
		status: 400,
		message: { err: 'An error occurred' },
	};

	let errObj = Object.assign({}, defaultError, err);
	return res
		.status(errObj.status)
		.json(errObj.message);
});

app.listen(3333);