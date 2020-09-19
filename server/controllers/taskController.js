//import the database from TaskModel.js
const db = require('../models/TaskModel');

module.exports = {

  // Should create a new line in the database.
  postTask: (req, res, next) => {
    //req.body will contain the item to be inserted into the database.
    const {item} = req.body;

    //Query String to be sent to the relational database.
    const QUERY = 'INSERT INTO Task (item, created_at) VALUES ($1, CURRENT_TIME) RETURNING *;'

    db.query(QUERY, [item])
      .then((data) => {
        //store the return value of the query to access in the route handler.
        res.locals.result = data.rows[0];
        return next();
      })
      .catch((err) => {
        //store the error of the query to access in the route handler. We'll check to see if its an instance of Error before sending a response.
        res.locals.result = err;
        return next();
      })

  }, 

  // Should retrieve all items form the database and send it back to the client as JSON.
  getTasks: (req, res, next) => {

    // Query string to retrieve all tasks from the database
    const QUERY = 'SELECT * FROM Task;'

    db.query(QUERY)
      .then((data) => {
        //data.rows will be an array of objects
        res.locals.result = data.rows;
        return next();
      })
      .catch((err) => {
        //store the error of the query to access in the route handler. We'll check to see if its an instance of Error before sending a response.
        res.locals.result = err;
        return next();
      })

  },

  // Should find items in the database based on an ID number and delete that item if it exists.
  deleteTask: (req, res, next) => {

  },

};
