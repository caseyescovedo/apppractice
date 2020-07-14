const Task = require('../models/TaskModel')


const postTask = async (req, res, next) => {
    const { item } = req.body
    res.locals = await Task.create({item})
    next()
}

const getTasks = async (req, res, next) => {
    res.locals.tasks = await Task.find()
    next()
}

const deleteTask = async (req, res, next) => {
    const { id } = req.body
    await Task.findByIdAndDelete(id)
    next()
}



module.exports = {postTask, getTasks, deleteTask};
