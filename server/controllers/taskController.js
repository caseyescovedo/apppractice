const db = require('../models/TaskModel.js');

const taskController = {};

taskController.postTask = async (req, res, next) => {
    console.log(req.body);
    const item = req.body.item;
    //I know this isn't doing what it should be doing but my created_at row is returning blank ...
    //Hoping I have enough time to fix this TIMESTAMP issue.
    //EDIT had to remove created_at column so I could get postman to work
    // const time = Math.floor(Date.now() /1000);
    
    
    const query = `INSERT INTO Task
    (item)
    VALUES 
    ('${item}')
    RETURNING * `
    
    const response = await db.query(query);
    res.locals.data = response.item;
    console.log('item', response.item)
    return next();
}

taskController.getTasks = async (req, res, next) => {
    console.log("I got here")
    const query = `SELECT * FROM Task`;
    const response = await db.query(query);
    console.log('response', response);
    res.locals.data = response.rows;
    return next();
}

// taskController.deleteTask = async (req, res, next) => {
//     const id = req.body.id;
//     const query = `DELETE FROM Task WHERE id = ${id}`;
//     const response = await db.query(query);
// }



module.exports = taskController;
