const db = require('../models/TaskModel')
const taskController = {}


taskController.postTask = (req,res,next)=>{
    const text= "INSERT INTO Task (item, created_at) VALUES($1,CURRENT_TIMESTAMP)";
    const value = [req.body.task];
    db.query(text,value,(err,data)=>{
        if(err) return(err)
        return next();
    })
}
taskController.getTasks = (req,res,next)=>{
    const text= "SELECT item FROM Task"
    db.query(text,(err,data)=>{
        if(err) return(err);
        // console.log(data.rows);
        res.locals.items = data.rows;
        return next();
    })
}
taskController.deleteTask = (req,res,next)=>{
    console.log('the task to delete',req.body.task);
    const text = 'DELETE FROM Task WHERE item = $1';
    const value = [req.body.task];
    db.query(text,value,(err,data)=>{
        if(err) return(err);
        return next()
    })

}


module.exports = taskController;
