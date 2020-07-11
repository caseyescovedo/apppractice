const authorize = (req, res, next) => {
  const token = req.cookies.token;
  console.log('token', token);

  if (token !== 'admin')
    throw { status: 401, message: 'You must be signed in to view this page' };
  return next();
};

module.exports = authorize;
