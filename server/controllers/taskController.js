const { query } = require('../models/TaskModel');

const taskController = {};

taskController.postTask = (req, res, next) => {
  const { item } = req.body;
  const queryString =  `INSERT INTO task(item)
                          VALUES ($1)
                          RETURNING *`;

  query(queryString, [item])
  .then((task) => {
    res.locals.task = task.rows;
    next()
  })
  .catch((err) => {
    console.log(`ERROR INSERTING TASK INTO DATABASE`);
    next(err);
  });
}

taskController.getTasks = (req, res, next) => {
  const queryString = `SELECT * FROM task`;

  query(queryString)
  .then((tasks) => {
    res.locals.tasks = tasks.rows;
    next();
  })
  .catch((err) => {
    console.log(`ERROR GETTING TASKS`);
    next(err);
  })
}

taskController.deleteTask = (req, res, next) => {
  const { id } = req.body;
  const queryString = `DELETE FROM task WHERE item_id=($1) RETURNING *`

  query(queryString, [id])
  .then((task) => {
    res.locals.task = task.rows;
    next();
  })
  .catch((err) => {
    console.log('ERROR DELETING ITEM');
    next(err);
  })
}

module.exports = taskController;
