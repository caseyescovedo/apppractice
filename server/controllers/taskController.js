const Task = require('../models/TaskModel');

module.exports = {
  postTask: async (req, res, next) => {
    try {
      const result = await Task.create({
        item: req.body.item,
        created_at: Date.now(),
      });

      res.status(201).json({ tasks: result });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        error: 'Cannot post task.',
      });
    }
  },
  getTasks: async (req, res, next) => {
    try {
      const result = await Task.find();
      res.status(201).json({ tasks: result });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        error: 'Cannot get tasks.',
      });
    }
  },
  deleteTask: async (req, res, next) => {
    try {
      const result = await Task.findByIdAndDelete(req.params.id);
      res.status(201).json({
        tasks: result,
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({
        error: 'Cannot delete task.',
      });
    }
  },
};
