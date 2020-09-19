const Item = require('../models/TaskModel')

const controller = {};

controller.postTask = (req, res, next) => {
  Item.create({ ...req.body }, (err, data) => {
    if (err) return next(err);
    res.locals.item = data;
    return next();
  });
}

controller.getTasks = (req, res, next) => {
  Item.find({}, (err, data) => {
    if (err) return next(err);
    res.locals.items = data;
    return next();
  });
}

controller.deleteTask = (req, res, next) => {
  const itemId = req.body.id;
  Item.findByIdAndDelete(itemId, (err, data) => {
    if (err) return next(err);
    res.locals.item = data;
    return next();
  });
}

module.exports = controller;