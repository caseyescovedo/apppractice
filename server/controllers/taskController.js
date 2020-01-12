/*
Task controllers
In the server/models/taskController.js file, add the following functionality to the exported controller. (These will be server middleware/final handler functions, so they should take the appropriate parameters and perform the necessary callback operations.):

 --Function postTask should create a new item in the database
 --Function getTasks should retrieve all items from the database and send it back to the client as JSON
 --Function deleteTask should find items in the database based on an ID number and delete that item if it exists
*/
const db = require('../models/TaskModel.js')


// GET ALL DATA
const getTask = (request, response) => {
    db.query(`SELECT * FROM task`, (error, results) => {
        if (error) {
          throw error
        }
        response.json(results.rows)
      })
    }

// POST NEW ITEM
const postTask = (request, response) => {
    const { item } = request.body
    db.query('INSERT INTO task (item) VALUES ($1)', [item], (error, results) => {
      if (error) {
        console.log(error);
        throw error
      }
      response.status(201).send(`Task added!`)
    })
  }

// DELETE TASK
const deleteTask = (request, response) => {
    const id = request.params.id;
  
    db.query('DELETE FROM task WHERE id = $1', [id], (error, results)=> {
      if (error) {
        throw error
      }
      response.status(200).send(`Task deleted`)
    })
  }







module.exports = {getTask,postTask,deleteTask};


