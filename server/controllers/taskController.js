const db = require('../models/TaskModel');

const taskController = {};

taskController.getTasks = (req, res, next) => {
  const queryStr = `SELECT * FROM Task;`;
  db.query(queryStr)
  .then(result => {
    console.log('tasks from taskController.getTasks: ', result.rows);
    res.locals.tasks = result.rows;
    return next();
  })
  .catch(err => {
    console.log(`Error in taskController.getTasks: ${err}`);
    return next(err);
  });
};

taskController.postTask = (req, res, next) => {
  const { item } = req.body;
  const queryStr = `INSERT into Task (item, created_at)
  VALUES ($1, $2);`;
  const values = [item, new Date()];
  db.query(queryStr, values)
  .then(result => {
    console.log('task added from postTask: ', item);
    res.locals.taskPosted = item;
    return next();
  })
  .catch(err => {
    console.log(`Error in taskController.postTask: ${err}`);
    return next(err);
  });
};
/*
To test this in Postman, put in Body/raw/JSON a json object:
{
	"item":"do assessment"
}
and then make a POST request to 'http://localhost:3333/todo'.
In ElephantSQL, I can now see a new row being added: 'do assessment, 2020-01-11 14:32:36 +0000'
*/

taskController.deleteTask = (req, res, next) => {
  const { id } = req.body;
  const queryStr = `DELETE FROM Task WHERE id = $1;`;
  const values = [id];
  db.query(queryStr, values)
  .then(result => {
    console.log('id of task deleted from deleteTask: ', id);
    res.locals.taskDeleted = id;
    return next();
  })
  .catch(err => {
    console.log(`Error in taskController.deleteTask: ${err}`);
    return next(err);
  });
};
/*
To test this in Postman, put in Body/raw/JSON a json object:
{
	"id": 2
}
and then make a DELETE request to 'http://localhost:3333/todo'.
In ElephantSQL, I can now see the second row 'do assessment, 2020-01-11 14:32:36 +0000' being deleted
*/

module.exports = taskController;
