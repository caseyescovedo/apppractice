const db = require('../models/TaskModel.js');
// const bcrypt = require('bcrypt');

const taskController = {};

taskController.postTask = (req, res, next) => {
  const { item } = req.body;
  const time = new Date();

  const queryString = 'INSERT INTO tasks ( item, created_at) VALUES ($1, $2) RETURNING item';
  const queryValues = [item, time];

  db.query(queryString, queryValues)
    .then((data) => {
      console.log('SUCCESSFUL UPDATE OF DB WITH ITEM: ', data);
      return next();
    })
    .catch((err) => {
      res.json('Item did not update to DB');
      console.log(`An error occurred while creating list item: ${err}`);
    });
};

taskController.getTasks = (req, res, next) => {
//   console.log('req.cookie: ', req.cookies);
//   const { email } = req.cookies;
  const queryString = 'SELECT * FROM tasks ORDER BY id ASC';
  //   const queryValues = [email];
  db.query(queryString)
    .then((data) => {
    //   console.log('====> taskController.getItems, data.rows should be an array of objects: ', data.rows)
      res.locals.tasks = data.rows;
      return next();
    })
    .catch((err) => next({
      log: `An error occurred while getting all items: ${err}`,
      message: { err: 'An error occurred in taskController.getTasks' },
    }));
};
taskController.deleteTask = (req, res, next) => {
//   console.log('first line in deleteItem HIT ME');
  const { itemId } = req.body;
//   console.log('req.body: ', req.body);
//   console.log('req.body.title: ', item);
  const queryString = 'DELETE FROM lists WHERE id=$1;';
  const queryValues = [itemId];
  db.query(queryString, queryValues)
    .then((data) => {
      console.log('====> taskController.deleteTask: ', data);
      return next();
    })
    .catch((err) => next({
      log: `An error occurred while getting deleting task: ${err}`,
      message: { err: 'An error occurred in taskController.deleteTask' },
    }));
};

module.exports = taskController;
