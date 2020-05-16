module.exports = {
  postTask(req, res, next) {
    // POST
    console.log('POST');

    return next();
  },
  getTask(req, res, next) {
    // GET
    console.log('GET');
    return next();
  },
  deleteTask(req, res, next) {
    // DELETE
    console.log('DELETE');
    return next();
  },
};
