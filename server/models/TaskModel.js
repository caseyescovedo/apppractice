// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = 'postgres://brvcmuch:8fltCw5yexgum1WBxnsIEJFZROkU0vvP@isilo.db.elephantsql.com:5432/brvcmuch';

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;

/* 
    oh dip, i totally forgot to move my queries into task model 
    if I have time after I comment the code I'll try to create a 
    TaskModel class that will query the database. And I could
    probably pass in the task model into res.locals instead of the
    pool
*/


module.exports = null; // <-- export your model
