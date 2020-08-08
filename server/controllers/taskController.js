const db =require('../models/TaskModel.js')

const taskController = {}

taskController.getTask= (req,res,next) => {
    const queryStr ='SELECt * from Task'
    db.query(queryStr)
    .then(data =>{
        res.locals = data.rows
        return next()
    })
    .catch((err)=> console.log(err))
}
taskController.postTask= (req,res,next) =>{
    const queryStr =`INSERT INTO Task  VALUES ( '${req.body.task}', ${req.body.time})`
    db.query(queryStr)
    .then((data)=>{
        res.locals=data.rows
        return next()
    })
    .catch((err) => next(err))
}
taskController.deleteTask= (req,res,next) =>{
    const del =req.body.id
    const queryStr =`DELETE FROM Task WHERE created_on='${req.body.id}'`
    db.query(queryStr)
    .then((data)=> {
        if(data.rowCount<1){
            res.locals=data
            res.status(200)
            return next()
        }
        return next({err:'err deleating task'})
    })
    .catch((err) => next(err))
}


module.exports = taskController;

