const db = require('../models/TaskModel.js');

const taskController = {};

taskController.postTasks = function(req,res, next) {
   // console.log(req);
   const {items} = req.body;
   const {created_at} = req.body;
   /*
     Unable to get any thing back from req.body 
     Moving on...

   */
 
   // console.log(stringedDate);
    const queryString = 'INSERT INTO Task (items, created_at) VALUES ($1, $2);'
    values = [`${items}`, `${created_at}`];

    db.query(queryString, values, (err, response) => {
        if(err){
         console.log(err)
        } 
        res.locals.items = items;
       return next();
    })

}

taskController.getTasks = function(req, res, next) {
    let queryString = 'SELECT * FROM Task';
    db.query(queryString, [], (err, response) => {
      if(err) {
          console.log(err)
      } else {
           res.locals.tasks = response.rows;
       console.log(response);
      }
      return next();
    })
}

taskController.deleteTask = function(req, res, next) {
    const {items} = req.body;
    let queryString = `DELETE FROM Task WHERE items='${items}');`

    db.query(queryString, [], (err, response) => {
    if(err) {
      console.log(err);
     }
     return next();
    })
}



module.exports = taskController;
