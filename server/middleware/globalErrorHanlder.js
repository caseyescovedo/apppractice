const globalErrorHandler = (err, req, res, next) => {
  const stackTrace = true;

  const defaultErr = {
    message: 'Unknown Server Error! Please see server log for details',
    status: 500,
    serverMessage: 'Unknown Middleware Error',
    serverLog: err,
  };

  const clientErrObj = Object.assign(defaultErr, err);

  const { message, status, serverMessage, serverLog } = clientErrObj;

  console.log('Server Side Message:', serverMessage);
  if (stackTrace) console.log('Error Trace:', serverLog);

  return res.status(status).json(message);
};

module.exports = globalErrorHandler;
