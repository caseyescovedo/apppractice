const db = require('../models/TaskModel.js');

const path = require('path');

const taskController = {};

// console.log('PATH', path.join(__dirname, '../models/TaskModel.js'));


taskController.postTask = (req, res, next) => {
  const { item } = req.body;

  const query = `INSERT INTO task(item) VALUES($1) RETURNING *`
  const params = [item];

  db.query(query, params)
    .then((data) => {
      // console.log('result', result);
      res.locals.data = data.rows[0];
      return next();
    })
    .catch((err) => next(err));
}

taskController.getTasks = (req, res, next) => {
  const query = `SELECT * FROM task`

  db.query(query)
    .then((data) => {
      console.log('data', data);
      res.locals.data = data.rows;
      return next();
    })
    .catch((err) => next(err));
}

taskController.deleteTask = (req, res, next) => {
  const { id } = req.params;

  const query = `DELETE FROM task WHERE _id=$1 RETURNING *`;
  const params = [id];

  db.query(query, params)
    .then((result) => {
      res.locals.data = result.rows[0];
      console.log(`Received DELETE request to delete item_id ${id}: '${res.locals.data.item}' from task table.`);
      return next();
    })
    .catch((err) => next(err));

}


module.exports = taskController;