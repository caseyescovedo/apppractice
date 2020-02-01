// importing my psql pool from taskModel
const db = require('../models/TaskModel.js');

// creating method object
const taskController = {};


// ************ tasks table *************
//     __id | user_id  | item | created_at (default Now())
//   ------+---------+------+------------

// *********** users table *************
// user_id | username  |   password   
// ---------+-----------+--------------
//        1 | codesmith | ilovetesting


// method to INSERT a task in psql
taskController.postTask = (req, res, next) => {
  // luckily in my tasks table I defaulted the user_id column to 1, since we are only 'working with our codesmith user' otherwise should have some functionality to get the userid and input that into the table

  // for now we can forget about the user_id field in each row

  // want to query the database really only need to input a new item
  // will probably get the item from pressing a button 
  // Clicking on the button to add a task should take the text from the input field and create a new task in the database.

  // get the value from the request body
  const { itemValue } = req.body;

  const addTaskQueryString = 'INSERT INTO tasks(item) VALUES ($1)';
  const addTaskValue = [itemValue];


  db.query(addTaskQueryString, addTaskValue)
    .then(queryResponse => {
      console.log('MY QUERY RESPONSE', queryResponse.rows);
      res.locals.taskAdded = queryResponse.rows;
      return next();
    })
    .catch(err => {
      return next(err);
    });


}

// method to SELECT a task in psql
taskController.getTasks = (req, res, next) => {

  // get the tasks and display them
  // want to return the tasks so should store after we get them from the database

  const getTasksQueryString = 'SELECT * FROM tasks';
  db.query(getTasksQueryString)
    .then(queryResponse => {
      console.log('GET TASKS QUERY RESPONSE:', queryResponse.rows);
      res.locals.tasks = queryResponse.rows;
      return next();
    })
    .catch(err => {
      return next(err);
    })
}

// method to DELETE a task in psql
taskController.deleteTasks = (req, res, next) => {

}


// rewrite the exports to more familiar format
module.exports = taskController;
