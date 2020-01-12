const taskRouter = require('./routes/taskRouter');
const authController = {};

authController.verify = (req, res, next) => {
  const { token } = req.cookie;
  if ( token === 'admin') res.redirect(taskRouter);
  return next();
};

module.exports = authController;
