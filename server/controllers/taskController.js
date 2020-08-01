const Tasks = require('../models/TaskModel.js');

const taskController = {};

//adds items to database
taskController.postTask = (req, res, next) => {
  const { item } = req.body;
  Tasks.create({
    item,
  })
    //additional check to make sure nothing happened, probably not necessary
    .then(({ item: addedItem }) => {
      if (addedItem === item) return next();
    })
    .catch((err) => next(err));
};

//retrieves all documents in tasks collection
taskController.getTasks = (req, res, next) => {
  Tasks.find({})
    .exec()
    .then((data) => {
      res.locals.data = data;
      return next();
    })
    .catch((err) => next(err));
};

//uses id in url path to find correct document and delete
taskController.deleteTask = (req, res, next) => {
  const { id } = req.params;
  Tasks.findByIdAndDelete(id)
    .exec()
    .then(() => {
      return next();
    })
    .catch((err) => next(err));
};

module.exports = taskController;
