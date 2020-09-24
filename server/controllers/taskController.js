const db = require('../models/TaskModel');

const controller = {};

controller.postTask = (req, res, next) => {
    //create new item in the Task DB
     const { item, created_at } = req.body;
    // console.log('hi', req.body)
    const values = [item, created_at];
    //query the databse passing the items received
    console.log(res.locals.post)
    const data = `INSERT INTO Task(item, created_at) VALUES ($1,$2) returning *`
   //pass in data values and callback func to the db
    db.query(data, values, (err, post) => {
       //give error message 
    if(err) {
        return next(err)
    }
    
    //send response back to the client that we received their details
    res.locals.post= post.rows[0]
    return next()
   }) 
}

controller.getTasks = (req, res, next) => {
    //read and selct every from table
    const text = `SELECT * FROM Task`;
    db.query(text).then((data) => {
        res.locals.details = data;
        return next();
    })
    .catch((err) => {
        return next(err)
    })
}

controller.deleteTask = (req, res, next) => {
    //assign destructuring of _id and assign it req.body
    const { _id } = req.body;
    //store values into an array
    const values = [_id];
    //query the database to delete entry
    db.query(`DELETE FROM Task WHERE _id =$1 RETURNING_id;`, values, (err, response) => {
        if(err) {
            return next(err);
        }else{
            res.locals.deleted = response.rows[0]
            return next()
        }
    })
}

// router.post('/secret', controller.postTask, (req, res) => {
//     res.status(200).json(res.locals.post);
// })

// // getTasks should retrieve all items from the database and send it back to the client as JSON
// router.get('/secret', controller.getTasks, (req, res) => {
//     res.status(200).json(res.locals.details);
// })
// //delete entry
// router.delete('/secret', controller.deleteTask, (req, res) => {
//     res.status(200).json(res.locals.deleted);
// })




module.exports = controller;