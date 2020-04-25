const pool = require('../models/TaskModel')

const postTask = async (req, res, next) => {
  try {
    const query = `
    INSERT INTO "Tasks" (item) VALUES ($1)
    RETURNING *
    `
    const item = req.body.item
    const body = [item]
    const data = await pool.query(query, body)
    res.locals.data = data.rows[0]
    return next()
  } catch (error) {
    return next(
      console.error('postTask error/taskController.js error: ', error.message)
    )
  }
}

const getTasks = async (req, res, next) => {
  try {
    const query = `
    SELECT *
    FROM "Tasks"
    `
    const data = await pool.query(query)
    res.locals.data = data.rows
    return next()
  } catch (error) {
    return next(
      console.error('getTasks error/taskController.js error: ', error.message)
    )
  }
}

const deleteTasks = async (req, res, next) => {
  try {
    const query = `
    DELETE FROM "Tasks"
    WHERE id = $1
    `
    const itemId = req.params.id
    const id = [itemId]
    await pool.query(query, id)
    return next()
  } catch (error) {
    return next(
      console.error('deleteTasks error/taskController.js error: ', error.message)
    )
  }
}

module.exports = {
  postTask,
  getTasks,
  deleteTasks,
};
