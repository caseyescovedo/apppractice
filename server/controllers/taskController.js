// #### Task controllers
// In the `server/models/taskController.js` file, add the following functionality to the exported controller. 
//     (These will be server middleware/final handler functions, so they should take the appropriate parameters and perform the necessary callback operations.):
// - Function `postTask` should create a new item in the database
// - Function `getTasks` should retrieve all items from the database and send it back to the client as JSON
// - Function `deleteTask` should find items in the database based on an ID number and delete that item if it exists

const db = require('./db/TaskModel.js');

const taskControllers = {};

taskControllers.postTask = (req, res, next) => {
  const { task, item } = req.body;
};

toDoControllers.getTasks = (req, res, next) => {
    const queryString = 'SELECT * FROM toDo';
    db.query(queryString, (err, response) => {
      if (err) return next ({
        log: 'DB select error',
        status: '400',
        message: { err }
      })
        console.log('hello hi, gorgeous. your response:', response);
        res.locals.allTasks = response.rows.json;
        next();
    })
  };

taskControllers.postTask = (req, res, next) => {
  const { task } = req.body;
  
  const queryString = 'INSERT INTO task VALUES ($1, $2)';
  const arr = [task, item];
  
  if (err) return next ({
    log: 'not today, boo. middleware error. abort',
    status: 400,
    message: { err },
  })
  next();
};

taskControllers.deleteTask = (req, res, next) => {
  const { id } = req.body;
  const deleteArray = [id];
  const deleteQuery = 'DELETE FROM task WHERE id = $1';
  db.query(deleteQuery, deleteArray, (err, response) => {
    if (err) return next({
      log: 'not today, boo. middleware error. abort',
      status: 400,
      message: { err },
    })
    next();
  });
};

module.exports = taskController;