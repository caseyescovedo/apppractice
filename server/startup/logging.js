/*
This module retuns a function that, when called, adds error handling
for errors that occur outside of our route chain (for instance in the 
  server.js file). 
*/

const logging = () => {
  process.on('uncaughtException', (e) => {
    console.log('UNCAUGHT EXCEPTION PROCESS:');
    console.log(e.message);
    process.exit(1);
  });

  process.on('unhandledRejection', (e) => {
    console.log('UNHANDLED PROMISE REJECTION:');
    console.log(e.message);
    process.exit(1);
  });
};

module.exports = logging;
