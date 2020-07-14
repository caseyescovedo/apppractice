/*
This module takes in a middleware request handler, controller name and
controller function name. Wrapping an async middleware function with this
allows me to centralize my async/await try / catch logic so I don't have
to repeat it in every controller. It makes use of the globalErrorHandler
to return errors to the client. 
*/

const handleAsyncErr = (handler, controlName, controlFunction) => {
  return async function (req, res, next) {
    try {
      await handler(req, res, next);
      return next();
    } catch (e) {
      const errObj = {
        serverLog: `${controlName}.${controlFunction} ERROR! ${e.message}`,
      };

      // set up bad request Error messages to reutrn to client via global
      // error handle (if I have time for data validation)
      // Create these objects and throw them manually in controllers
      if (e.status) {
        if (e.status >= 400 && e.status < 500) {
          errObj.status = e.status;
          errObj.message = e.message;
        }
      }
      return next(errObj, req, res, next);
    }
  };
};

module.exports = handleAsyncErr;
