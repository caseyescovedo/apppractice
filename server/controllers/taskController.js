const db = require('../models/TaskModel');
const taskController = { };

taskController.postTask = async (req, res) => {
  const { item } = req.body;
  if (!item || typeof item !== 'string') return;
  const query = {
    text: `INSERT INTO "Task" (item, created_at) VALUES($1, NOW()) RETURNING *`,
    values: [item],
  };
  try {
    const { rows } = await db.query(query);
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
  }
};

taskController.getTasks = async (req, res) => {
  const query = `SELECT * FROM "Task"`;
  try {
    const { rows } = await db.query(query);
    return res.json(rows);
  } catch (error) {
    console.error(error);
  }
};

taskController.deleteTask = async (req, res) => {
  const { id } = req.query;
  if (!id) return;
  const query = {
    text: `DELETE FROM "Task" WHERE _id = $1`,
    values: [id],
  };
  try {
    await db.query(query);
  } catch (error) {
    console.error(error);
  }
};

module.exports = taskController;
