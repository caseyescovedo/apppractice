/**
 *  COULDN'T FINISH AUTHENTICATION PORTION OF ASSESSMENT
 *  UNFORTUNATELY, RAN OUT OF TIME
 */

const authController = {};

authController.validate = (req, res, next) => {
  const { user, pass } = req.body;
  if (user === 'codesmith' && pass === 'ilovetesting') {
    res.redirect('/secret');
  } else {
    res.locals.message = 'unsuccessful login attempt';
  }
};

module.exports = authController;
