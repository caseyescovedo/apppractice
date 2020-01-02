const pool = require('../models/TaskModel');
const taskController= {};

//GET TASKS

taskController.getTasks = (req,res,next) => {
  const textQuery = `
  SELECT * FROM tasks
  `;
  pool.query(textQuery)
  .then(result => {
    res.locals.tasks = result.rows;
    console.log(res.locals.tasks)
    return next()
  })
  .catch(err => {
    console.log("Error in taskController.getTasks", err)
    return res.sendStatus(500)
  })
}

//POST TASK
taskController.postTask = (req,res,next) => {
  const  {item}  = req.body;
  const textQuery = `
  INSERT INTO tasks (item, created_at)
  VALUES ($1, NOW())
  RETURNING *
  `
  const values = [item];
  pool.query(textQuery, values, (err,result) =>{
    if(err) {
      console.log("Error in taskController.postTask", err)
    }
    res.locals.tasks = result.rows;
    return next()
  })
}

//DELETE TASK
taskController.deleteTask = (req, res, next) => {
  const {id} = req.body;
  if(!id) {
    return res.status(400).json({
      success: false,
      message: 'missing task id'
    })
  }
  const textQuery = `
  DELETE
  FROM tasks
  WHERE id=$1
  RETURNING *
  `;
  const values = [id];
  pool.query(textQuery, values, (err, result) => {
    if(err) {
      console.log("Error in taskController.deleteTask", err)
      return res.status(500)
    }
    res.locals.tasks = result.rows;
    return next()
  })
}


module.exports = taskController;
