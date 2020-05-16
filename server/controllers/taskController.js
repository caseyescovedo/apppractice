const db = require('../models/TaskModel');

module.exports = {
  postTask: (req, res, next) => {
    const { task } = req.body;
    console.log('this is the req.body: ', req.body);
    console.log('this is the req.query: ', req.query);
    console.log('this is the req.params: ', req.params);
    const text = `INSERT INTO Task(item) VALUES($1)`;
    const values = [task];
    db.query(text, values, (err, result) => {
      if (err) {
        console.log('error in postTask middleware');
      } else {
        console.log('result of postTask: ', result);
        next();
      }
    });
  },

  getTasks: (req, res, next) => {
    const text = `SELECT * FROM Task`;
    db.query(text, (err, result) => {
      if (err) {
        console.log('error while retrieving tasks from db');
      } else {
        console.log('successfully retrieved tasks: ', result.rows[0]);
        res.json(result.rows);
      }
    });
  },

  deleteTask: (req, res, next) => {
    console.log('req.body in the deleteTask: ', req.body);
    const { deleteTask } = req.body; // update to be body param
    const text = `DELETE FROM Task WHERE item_id=$1`;
    const values = [deleteTask];
    db.query(text, values, (err, result) => {
      if (err) {
        console.log('error while deleting task from DB');
      } else {
        console.log('item successfully deleted');
      }
    });
  },
};
