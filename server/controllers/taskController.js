const db = require('../index');

const taskController = {};

// this is middleware to GET messages;
taskController.getItems = (req, res, next) => {
  const text = `SELECT * FROM Task`;
  db.query(text)
    .then(response => {
      res.locals.tasks = response.rows;

      return next();
    })
    .catch(err => {
      console.log('ERROR FROM GETTING TODOS CONTROLLER');
      return next(err);
    });
};

// this is the middleware handling posts
taskController.postItem = (req, res, next) => {
  const text = `INSERT INTO task (item) VALUES ($1) RETURNING *`;
  // req.body.created_at would not be needed if we can create a DATE creation in sql
  const params = [req.body.item];

  db.query(text, params)
    .then(response => {
      console.log('SUCCESSFULLY POSTED TO DB');
      res.locals.responses = response.rows;
      return next();
    })
    .catch(err => {
      console.log('ERROR FROM ADDING TO DB');
      return next(err);
    });
};

// this is the middleware handling deleting based on ID
taskController.deleteItem = (req, res, next) => {
  const text = `DELETE FROM Task WHERE task.id = $1`;
  const { id } = req.params.id;
  const params = [id];
  db.query(text, params)
    .then(resp => {
      console.log('SUCCESSFULLY DELETED TO DB: ', resp);
      return next();
    })
    .catch(err => {
      console.log('ERROR: ', err);
      return next(err);
    });
};

module.exports = taskController;
