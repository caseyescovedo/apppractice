const db = require('../models/TaskModel.js');
const controller = {};



controller.createTable= (req, res, next)=>{
    console.log('hitting the createtable in controller')
    db.query('CREATE TABLE IF NOT EXISTS Task (user_id serial PRIMARY KEY, task VARCHAR(200), created_at TIMESTAMP) ')
        .then((response)=>{response.json
            next()
        })
        .catch((error)=>console.log(error))
    }



controller.getTasks =(req,res,next)=>{
    console.log('hitting the getTask in controller')
    db.query('SELECT * FROM Task')
        .then((response)=>{
            res.locals.tasks = response.rows
            console.log('res.locals.tasks: ',res.locals.tasks)
            return next()
        })
        .catch((error)=>console.log(error))
}

controller.postTask = (req,res,next)=>{
    console.log('hitting the postTask in controller')
    const queryline = "INSERT INTO Task (task) VALUES ($1)"
    const values = [req.body.task]
    console.log(values)
    db.query(queryline,values)
        .then((response)=>{
            console.log(response)
            return next()
        })
        
        .catch((error)=>error)
}

controller.deleteTask = (req,res,next)=>{
    console.log('hitting the deleteTask in controller')
    const queryLine = "DELETE FROM Task WHERE id = $1"
        .catch((error)=>console.log(error))
}








// controller.postTask = (req,res,next)=>{

// }




module.exports = controller;
