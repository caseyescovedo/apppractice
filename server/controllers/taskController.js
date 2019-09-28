
const taskController = {};

taskController.postTask = (req, res, next) => {
  console.log(`postTask with id: ${req.body.description}`);

  next();
}
// dummy data
let dummyTasksId = 14;
const dummyTasks = {tasks: 
    [
      {item: 'Clean up your room.', created_at: Date.now(), id: 10},
      {item: 'Go to the gym.', created_at: Date.now(), id: 11},
      {item: 'Watch a movie.', created_at: Date.now(), id: 12}
    ]}

taskController.getTasks = (req, res, next) => {
    res.locals.getTasks = dummyTasks;
  
    next();
}

  
taskController.deleteTask = (req, res, next) => {
    console.log(`deleteTask with id: ${req.body.id}`);
  
    next();
}
  

module.exports = taskController;