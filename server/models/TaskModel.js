// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI = '';

const Pool = require("pg").Pool;
const pool = new Pool({
    user: "krystalchen",
    host: "localhost",
    database: "todolist",
    password: "123",
    port: 5432
});
// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;


// postTask should create a new item in the database
const postTask = (req, res, next) => {
    const { item, create_at } = req.body;
    pool.query(
        'INSERT INTO task (item) VALUES ($1) RETURNING *',
        [item],
        (error, results) => {
            if (error)
                throw error;
            console.log(results.rows);
            res.locals.postTask = results.rows;
        }
    )
}
// getTasks should retrieve all items from the database and send it back to the client as JSON
const getTasks = (req, res, next) => {
    pool.query('SELECT * FROM task', (error, results) => {
        if (error) {
            return error;
        }
        console.log('check database', results.rows);
        res.locals.getTasks = resutls.rows;
        return next();
    });
};
// deleteTask should find items in the database based on an ID number and delete that item if it exists
const deleteTask = (req, res, next) => {
    const id = parseInt(req.params.id);

    pool.query("DELETE FROM task WHERE id = $1", [item], (error, results) => {
        if (error) {
            res.json(error);
        }
        res.locals.deleteItem = results.rows;
        return next();
    });
};
module.exports = { postTask, getTasks, deleteTask }; // <-- export your model
