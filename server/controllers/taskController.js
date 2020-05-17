const db  = require('../models/TaskModel');
const taskController = {};

taskController.getTasks = (req, res, next) => {
    // Task.find({}, (err, data) => {
    //     if(!err) {
    //         res.locals.tasks = data;
    //         return next();
    //     } else {
    //         return next(err)
    //     }
    // });
    const queryString = "SELECT * FROM Task"
    db.query(queryString, [], (err, result) => {
        if(err) {
          return next({ err: err,
          log: "could not get tasks"});
        } else {
          const rows = result['rows'];
          const output = [];
          for(let i = 0; i < rows.length; i++){
            output.push({item: rows[i]['item'], _id: rows[i]['_id'], date: rows[i]['date']})
          }
        }
          res.locals.tasks = output;
          // console.log(res.locals.characters[0])
          // res.locals.characters[0]['species'] = "Test";
          return next();
        });
};

taskController.deleteTask = (req, res, next) => {
    Task.findOneAndDelete({_id: req.params.id}, (err) => {
      if(!err) {
        return next();
      } else {
        return next(err);
      }
    });
  };
  
taskController.postTask = (req, res, next) => {
    console.log("we got here, with: ", req.body)
    Task.create(req.body, (err, task) => {
      if (err) return next(err);
      console.log(task);
      res.locals.task = task;
      return next();
    });
  };


module.exports = taskController;
