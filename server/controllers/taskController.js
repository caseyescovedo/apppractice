/*
and perform the necessary callback operations.):
- [ ] Function `postTask` should create a new item in the database
- [ ] Function `getTasks` should retrieve all items from the database and send it back to the client as JSON
- [ ] Function `deleteTask` should find items in the database based on an ID number and delete that item if it exists
*/
const TaskModel = require('../models/TaskModel');

module.exports = {
    postTask: function(req, res, next){
        /* handles creating a task on the server */
        console.log(req.body);
        TaskModel.createItem(req.body.item)
            .then( (result) => {res.status(200); res.json(result.rows[0])}) // sends back the item created
            .catch( (err) => {console.log(err);next(err)});
    },
    getTasks: function(req, res, next){
        /* handles of getting all the tasks from the database and sends back to the client in json */
        TaskModel.getAll()
            .then(tasks => {
                res.json(tasks.rows);
            })
            .catch(err => next(err));
    },
    deleteTask: function(req,res, next){
        /* deletes task from the database by the id passed into the reqs body object */
        TaskModel.delete(req.body.id)
            .then(() => res.sendStatus(200))
            .catch(err => next(err));
    }
};
