const db = require('../models/TaskModel.js');

const taskControllers = {};

taskControllers.postTask = (req, res, next) => {
  const { item } = req.body;
  
  const array = [item];
  const queryString = 'INSERT INTO Task (item) VALUES ($1)'
  db.query(queryString, array,  (err) => {
    if(err) return next({
      log: "Db insert error", 
      status: '400',
      message: { err }
    })
    next();
  })
}

taskControllers.getTasks = (req, res, next) => {
  const queryString = 'SELECT * FROM Task'
  db.query(queryString, (err, response) => {
    if(err) return next({
      log: "Db all error", 
      status: '400',
      message: { err }
    })
    console.log('this is the response: ', response)
    res.locals.allTasks = response.rows;
    next();
  }) 
}

taskControllers.deleteTask = (req, res, next) => {
  const { id } = req.body;

  const deleteArray = [id]
  const deleteQuery = 'DELETE FROM Task WHERE id = $1'
  db.query(deleteQuery, deleteArray, (err) => {
    if(err) return next({
      log: "Db delete error", 
      status: '400',
      message: { err }
    })
    next();
  })
}

taskControllers.checkCookie = function(req, res, next) {
  
  const cookies = req.cookies;
 
  if (cookies['Authed'] === 'true') {
    return next();
  } else {
   
    res.json({ message: 'You must be signed in to view this page' });
  }

  return next();
};
module.exports = taskControllers;
