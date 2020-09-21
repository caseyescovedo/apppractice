//require in database pool
const db = require('../models/TaskModel.js');

const tasksController = {};

//MIDDLEWARE FUNCTIONS
//post a task to the database
tasksController.postTask = (req, res, next) => {
  //task is to be sent on the body as task
  const {item} = req.body;

  //create query string
  const QUERY  = 'INSERT INTO Tasks (item) VALUES ($1);';

  //query the db
  db.query(QUERY, [item])
    .then(() => next())
    .catch(err => next(err));
};

//get all tasks from the database
tasksController.getTasks = (req, res, next) => {
  
  const QUERY = 'SELECT * FROM Tasks;';

  //query the db
  db.query(QUERY)
    .then(data => {

      //if response from db was empty return an error
      if(data.rows.length === 0){
        return next({
          log: "Error occured getting tasks",
          message: "please ensure that there are task in the database"
        });
      }

      //add tasks data from db to res.locals
      res.locals.tasks = data.rows;
      return next();
    })
    .catch(err => next(err));
};

//delete a desginated task from the database
tasksController.deleteTask = (req, res, next) => {
  //task is to be sent on the body as task
  const {id} = req.body;

  //create query string
  const QUERY  = 'DELETE FROM Tasks WHERE id = $1;';

  //query the db
  db.query(QUERY, [id])
    .then(() => next())
    .catch(err => next(err));
};

module.exports = tasksController;
