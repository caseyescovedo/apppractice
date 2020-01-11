const authController = {};

authController.setCookie = (req, res, next) => {
  console.log('in cookie controller');
  res.cookie('mystery', Math.floor * 999 (Math.random()));
}


module.exports = {


};
