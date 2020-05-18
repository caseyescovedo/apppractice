const { Pool } = require('pg');
const uri = 'postgres://brvcmuch:8fltCw5yexgum1WBxnsIEJFZROkU0vvP@isilo.db.elephantsql.com:5432/brvcmuch';

const pool = new Pool({connectionString: uri});

async function create(){
    await pool.query(`DROP TABLE IF EXISTS Tasks;`);
    
    await pool.query(`CREATE TABLE Tasks (
        id SERIAL PRIMARY KEY,
        item varchar NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
    );`);

    await pool.query(`INSERT INTO Tasks (item) VALUES ('dur');`);
}

create().then( () => console.log('created new table')).catch( (err) => console.log('error', err) );