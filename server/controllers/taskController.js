const db = require('../models/TaskModel.js'); 
const taskController = {}; 

taskController.getTasks = (req,res,next) =>{
    const queryText = `SELECT * 
    FROM Task`
        db.query(queryText)
            .then((items)=>{
                res.locals.items = items.rows
                next()
            })
            .catch(e =>{
                console.log(e)
            })
},
taskController.postTask = (req,res,next) =>{
    const queryText = `INSERT INTO Task(item)
    VALUES ($1)`
        const {item} = req.body
            const values = [item]
                db.query(queryText,values)
                    .then((items)=>{
                        console.log('items returned from promise', items)
                        next()
                    })
                    .catch(e =>{
                        console.log(e)
                    })
}
taskController.deleteTask = (req,res,next) =>{
    const queryText = `DELETE FROM Task
    WHERE id = $1`
        const {id} = req.params
            const values = [id]
                db.query(queryText,values)
                    .then((item)=>{
                        next()
                    })
                    .catch(e =>{
                        console.log(e)
                    })
}

module.exports = taskController; 
// module.exports = {
// taskController

// };
