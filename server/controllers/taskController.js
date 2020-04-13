// #### Task controllers
// In the `server/models/taskController.js` file, add the following functionality
// to the exported controller. (These will be server middleware/final handler
//     functions, so they should take the appropriate parameters and perform the
//     necessary callback operations.):
// - [ ] Function `postTask` should create a new item in the database
// - [ ] Function `getTasks` should retrieve all items from the database and send
//  it back to the client as JSON
// - [ ] Function `deleteTask` should find items in the database based on an ID
// number and delete that item if it exists
const Model = require('../models/TaskModel');

const msgHandler = {};

msgHandler.postTrack = (req, res, next) => {
  const { item } = req.body;
  console.log(item);
  Model.create({ item }, (err, itemSavedInDb) => {
    if (err) {
      return next(err);
    }
    return next();
  });
};

msgHandler.getItems = (req, res, next) => {
  Model.find({}, (err, foundItems) => {
    if (err) {
      return next(err);
    }
    res.locals.foundItems = foundItems;
    return next();
  });
};

msgHandler.deleteItem = (req, res, next) => {
  const { id } = req.params;
  Model.findByIdAndDelete(id, (err, deletedItem) => {
    if (err) {
      return next(err);
    }
    return next();
  });
};

module.exports = msgHandler;
