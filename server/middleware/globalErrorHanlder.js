const globalErrorHandler = (err, req, res, next) => {
  const stackTrace = true;

  const defaultErr = {
    message: 'Unknown Server Error! Please see server log for details',
    status: 500,
    serverMessage: 'Unknown Middleware Error',
    serverLog: err,
  };

  const clientErrObj = Object.assign(defaultErr, err);

  const { message, status, serverMessage, severLog } = clientErrorObj;

  console.log('Server Side Message:', serverMessage);
  if (stackTrace) console.log('Error Trace:', serverErr);

  return res.status(status).json(message);
};

module.exports = globalErrorHandler;
