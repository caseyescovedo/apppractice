
const taskController = {};

//postTask function creates a task
taskController.addTodo = (req, res, next) => {
    if (res.locals.todo[req.params.id]) return next();
    res.locals.todo[req.params.id] = true;
},

//getTask function retrieves task from database and sends it as json to client
taskController.getTask = (req, res, next) => {
    const results = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../models/TaskModels'), 'UTF-8'))
    next();
},

//deleteTask function deletes task
taskController.deleteTask = (req, res, next) => {
    const { id } = req.params;
    if(!res.locals.todo[id]) return next();
    delete res.locals.favs[id];
}

module.exports = {taskController}
