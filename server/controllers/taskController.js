const db = require('../models/TaskModel');

const taskController = {};

taskController.postTask = (req, res, next) => {
  const { item, userid } = req.body;
  const text = [item, userid];
  const query = 'INSERT INTO tasks (item, userid) VALUES ($1, $2)';

  db.query(query, text)
    .then((data) => {
      console.log('item successfully added');
      // console.log(data);
      return next();
    })
    .catch((err) => {
      console.log(err);
    });
};

taskController.getTasks = (req, res, next) => {
  const { userid } = req.cookies;
  const text = [userid];
  const query = 'SELECT * FROM tasks WHERE userid = $1';

  db.query(query, text)
    .then((data) => {
      res.locals.items = data.rows;
      return next();
    })
    .catch((err) => {
      console.log(err);
    });
};

taskController.deleteTask = (req, res, next) => {
  const { id } = req.body;
  const text = [id];
  const query = 'DELETE FROM tasks WHERE id = $1';
  db.query(query, text)
    .then((data) => {
      console.log('deleted successfully');
      res.send('deleted successfully');
      return next();
    })
    .catch((err) => {
      console.log(err);
    });
};

taskController.editItem = (req, res, next) => {
  const { id, item } = req.body;
  const text = [id, item];
  const query = `UPDATE tasks
  SET item = $2
  WHERE id = $1;`;
  db.query(query, text)
    .then((response) => {
      console.log('updated!');
      next();
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports = taskController;
