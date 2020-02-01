const db = require('../models/TaskModel.js')

const taskController = {};


//controller for posting in to the db 
taskController.postTask = (req, res, next) => {
 const { item } = req.body;
 const itemArr = [item]
 const postQuery = 'INSERT INTO Task (item) VALUES ($1)'

 db.query(postQuery, itemArr, (err, response) => {
     if (err) 
     return next({
        log: 'Insert Item Error',
        status: 400,
        message: { err }
    })
 })
    next()
};


// controller for get the list of item from db
taskController.getTasks = (req, res, next) => {
  const getQuery = 'SELECT * FROM Task'
  db.query(getQuery, (err, response) => {
      if (err)
      return next({
          log: 'Get All Error',
          status: 400,
          message: { err }
      })
      res.locals.getTasks = response.rows
      next()
  })
}

//controller for deleting a item in db
taskController.deleteTask = (req, res, next) => {
    const { id } = req.body;
    const idArray = [id]
    const deleteQuery = 'DELETE FROM Task WHERE id = $1'
    db.query(deleteQuery, idArray, (err, response) => {
        if(err)
        return next({
            log: 'Delete Error',
            status: 400,
            message: { err }
        })
    })
    next()
}
    

module.exports = taskController;
