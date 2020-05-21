// import db?
const db = require('../models/TaskModel.js')


const taskController = {};

taskController.postTask = (req, res, next) => {
//   do not want to directly inject user input into DB, input will be stored in variable
//   console.log('this is the request body   --', req.body)
  const query = {
    request: `INSERT INTO Task (item) VALUES ($1)`,
    tasks: [req.body]
  }
  // need to make a query to INSERT
  // can use a promise instead of a callback
  db.query(query)
    .then(values => res.locals.values = values.rows[0])
    .then(() => next())
    .catch((err) => console.log('There is an error here!', err))

}



taskController.getTask = (req, res, next) => {
  // make a query to SELECT

  // should retrieve all items from the database and send it back to the client as JSON
  const request = `SELECT item FROM Task`;
  db.query(request)
    .then(result => res.locals.result = result.rows.json())
    .then(() => next())
    .catch((err) => next(err))
  
}

taskController.deleteTask = (req, res, next) => {
  // make a query to DELETE
  // what the user wants to delete should be specified 
  // delete based on id number 
  const request = `DELETE FROM Task WHERE task=${SOMETHINGINHERE}`  ;
  db.query()
  
}



module.exports = taskController;

// module.exports = {

// };
