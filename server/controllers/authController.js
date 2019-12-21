const Task = require('../models/TaskModel');
module.exports = {
  
  setCookie(req, res, next) {
    res.cookie('token', 'admin', { httpOnly: true });
    return next();
  },

  verifyCookie(req, res, next) {
    Task.findOne({ _id: req.body._id }, (err, data) => {
      // if(data.username !== req.cookies)
    })
  }

};
