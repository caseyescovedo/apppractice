const db = require('../models/TaskModel');

const taskController = {};

taskController.postTask = async (req, res, next) => {
  const { item, created_at } = req.body;
  const query = `
  INSERT INTO Tasks (item, created_at)
  VALUES ('${item}', '${created_at}')
  RETURNING *;
  `;

  const { rows } = await db.query(query);
  res.locals.newTask = rows[0];

  next();
};

taskController.getTasks = async (req, res, next) => {
  const query = `
  Select * 
  FROM Tasks;`;
  const { rows } = await db.query(query);
  res.locals.tasks = rows;
  next();
};
taskController.deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const query = `
    DELETE FROM Tasks
    WHERE id = ${id}
    RETURNING *;
    `;
    const response = await db.query(query);
    if (response.rowCount === 1) res.locals.deletedItem = true;
    else res.locals.deletedItem = false;
    next();
  } catch (e) {
    console.log(e);
  }
};

module.exports = taskController;
