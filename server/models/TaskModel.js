// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
//destructure pool from postgresql
const { Pool } = require('pg');
const myURI = 'postgres://ikezvcjf:X2XMB9Rqp5SeNInTR_LVgwBtDExaoccq@rajje.db.elephantsql.com:5432/ikezvcjf';


const URI = myURI;
//connect database, new instance of pool

const pool = new Pool({connectionString: URI});

//creating tables use CREATE TABLE IF NOT EXISTS tablename
const queryString = 'CREATE TABLE IF NOT EXISTS todoList (id SERIAL PRIMARY KEY, tasks VARCHAR)';


//creating auth table 
const userTable = 'CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, username VARCHAR)';



//create pool query to be exported
pool.query(queryString, (err)=>{
    if(err) console.log(err);
});

//create pool for userTable connection
pool.query(userTable, (err)=> {
   if (err) console.log(err);
})


//queryString, array(options), callback
module.exports = {
    query: (text, options, callback) => {
    //each time we execute a query, console.log executed
    console.log('executed query: ', text);
        //must return pool query
        return pool.query(text, options, callback);
    }
}; // <-- export your model
