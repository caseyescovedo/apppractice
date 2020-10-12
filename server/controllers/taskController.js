const Task = require('../models/TaskModel');
/*
Function postTask should create a new item in the database
Function getTasks should retrieve all items from the database and send it back to the client as JSON
Function deleteTask should find items in the database based on an ID number and delete that item if it exists
*/


module.exports = {
postTask: async (req,res, next) =>{
  const task=req.body;
  await Task.create(task).then(response=> {
    res.locals.task=response;
    return next();
  }
).catch(err=>next({ log: `error from postTask ${err.message}` })
);
 
}, 
getTasks: async (req,res, next) =>{
  await Task.find({}).exec().then( response=>{  
  res.locals.tasks = response;
  return next();
  }
  ).catch(err=>next({ log: `error from getTasks ${err.message}` }));
}, 
deleteTask: async (req,res, next) =>{
  const id=req.body._id;
  await Task.findOneAndDelete({_id:id}).exec().then(response=>{
    res.locals.id = response;
    return next();
  }
  ).catch(err=>next({ log: `error from deleteTask ${err.message}` }));
}
};
