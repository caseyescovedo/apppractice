const express = require('express')
const path = require('path')
const taskController = require('../controllers/taskController')

const router = express.Router()


// get all tasks
router.get('/getTasks', taskController.getTasks, (req,res,) => {
   return res.status(200).json( res.locals.tasklist)
})

//delete  tasks
router.delete('/delete/:id',taskController.deleteTask, (req,res,) => {
    return res.status(200).json(res.locals.delete)
 })

//post taks
router.post('/postTasks', taskController.postTask, (req,res,) => {
    return res.status(200).json(res.locals.post)
 })


module.exports = router;