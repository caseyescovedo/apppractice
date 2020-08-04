const Task = require('../models/TaskModel.js')

module.exports = {
    postTask (req, res, next) {
        Task.create({
            item : req.body.item,
            created_at : req.body.created_at
        })
        .then((data) => {
            if (data) res.json(data)
            else res.sendStatus(418)
        })
        .catch((err) => next(err))
    }, 


    getTasks (req,res, next) {
        Task.find({}).exec()
        .then((data) => {
            if (data) res.json(data)
            else res.sendStatus(418)
        }) 
        .catch((err) => next(err))
    }, 


    deleteTask (req,res, next) {
        const id = req.params.id
        console.log(req.params)
        Task.findByIdAndDelete({id}).exec
        .then((data) => {
            if (data) res.json(data)
            else res.sendStatus(418)
        }) 
        .catch((err) => next(err))
    }, 

};
