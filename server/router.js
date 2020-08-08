const express = require('express')
const taskController = require('./controllers/taskController.js')
// const cookieController = require('../controllers/authController')

const router = express.Router()

router.get('/',taskController.getTask,(req,res)=>{
    res.status(200).json(res.locals)
})
router.post('/',taskController.postTask,(req,res)=>{
    res.status(200).json(res.locals)
})
router.delete('/',taskController.deleteTask,(req,res)=>{
    res.status(200).json(res.locals)
})

module.exports = router