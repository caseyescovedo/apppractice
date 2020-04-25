const db = require('../models/TaskModel.js');

const taskController = {};

// create a new item in the database
taskController.postTask = (req, res, next) => {
  const date = (new Date()).toUTCString();
  const insert = 
  `INSERT INTO task(item, created_at) 
  VALUES ($1, $2)`
  
  const values = [ req.body.text, date]

  db.query(insert, values)
  .then(inserted=>{
    next();
  })
  .catch(err=>next('error in postTask middleware'))
}


// retrieve all the items from the database and send it back to the client as JSON
taskController.getTasks = (req, res, next) => {
  const getTask = `SELECT * FROM task`

  db.query(getTask)
  .then(allTasks=>{
    res.locals.allTasks = allTasks.rows;
    next();
  })
  .catch(err=> next('error in getTasks middleware'))
}

// find all items in the database based on the id number and delete that item if it exists
taskController.deleteTask = (req, res, next) => {
  const deleteQuery = 
  `DELETE FROM task 
  WHERE _id=$1`

  const deleteInfo = [req.params.id];

  db.query(deleteQuery, deleteInfo)
  .then(deleted=>{
    next();
  })
  .catch(err=>next('error in deleteTask middleware'))
}


module.exports = taskController;