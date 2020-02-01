//gives access to our pool aka taskmodel file so we can query our table;
const db = require('../models/TaskModel.js')

const taskControl = {};


//in each controller. We need to create a query string.
//the information comes into the body as req.body as a object; We want to use object Destructuring to assign it to the item.
//create a variable to hold the item in and array so we can use it when we are querying.
//create a err handler incase we aren't getting anything back.
//always return next; 

//controller to post info.
taskControl.postTask = (req, res, next) => {
    console.log('req in postTask', req,body);
    //when client makes post request. the info will come into the body as a req object. 
    const { item } = req.body;
    //itemArr is going to hold the value we want to insert into the table
    const itemArr = [item];
    const queryString = 'INSERT INTO Task (item) VALUES ($1)';
    //db.query 
    db.query(queryString, itemArr, (err, response) => {
      //creating a err handler incase we don't get anyhting
        if (err) 
            return next({
              log: 'error adding  new item  to Task table',
              message: { err }
            });
          })
    return next();
};

//controller to get all info.
taskControl.allTasks = function(req, res, next) {
  //gotta create query string so the table know whats to request when accessing sql;
    const queryString = 'SELECT * FROM Task';
    db.query(queryString, (err, response) => {
      if (err) {
        return next({
          log: 'error in allTask',
          message: { err }
        });
      } else {
        console.log(
          'allTasks from response.rows ',
          response.rows
        );
        res.locals.allTasks = response.rows;
        return next();
      }
    });
  };


//controller to delete task
taskControl.deleteTask = function(req, res, next) {
    const { id } = req.body;
    const arr = [id];
    const queryString = 'DELETE from Task WHERE id=$1';
    db.query(queryString, arr, (err) => {
      if (err) {
        return next({
          log: 'error in deleteTask',
          message: { err }
        });
      }
    });
    return next();
}

module.exports = taskControl;
