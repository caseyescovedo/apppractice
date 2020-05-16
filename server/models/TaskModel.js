// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const { Pool } = require('pg');
const myURI = 'postgres://brvcmuch:8fltCw5yexgum1WBxnsIEJFZROkU0vvP@isilo.db.elephantsql.com:5432/brvcmuch';

// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;

/* 
    oh dip, i totally forgot to move my queries into task model 
    if I have time after I comment the code I'll try to create a 
    TaskModel class that will query the database. 
*/

const pool = new Pool({connectionString: URI});

class TaskModel {
    static getAll(){
        return pool.query('SELECT * FROM Tasks;');
    }
    static createItem(name){
        return pool.query('INSERT INTO Tasks (item) VALUES ($1) RETURNING id, item', [name]);
    }
    static delete(id){
        return pool.query('DELETE FROM Tasks WHERE id=$1;',[id]);
    }
}

module.exports = TaskModel; // <-- export your model
