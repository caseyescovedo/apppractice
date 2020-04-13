const authController = {};
authController.setCookie = (req, res, next) => {
  res.cookie = `token=admin`;
  return next();
};
// WAS STILL WORKING ON VALIDATION
// if (user === 'codesmith' && pass === 'ilovetesting') {
//     next();
//   } else {
//     //   if user and password didn't match, just throw an error message immediately
//     return res.status(401).send('unsuccessful login attempt');
//   }

authController.validate = () => {};
module.exports = authController;
