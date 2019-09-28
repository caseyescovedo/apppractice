const { Pool } = require("pg");
const myURI =
	"postgres://oxlmwbyi:qjVtW5CjYZLfUEIlQgqCybyWZQTSGxdj@salt.db.elephantsql.com:5432/oxlmwbyi";
const URI = process.env.PG_URI || myURI;
const pool = new Pool({ connectionString: URI });

const postTask = (req, res, next) => {
	const insertToTable = `INSERT INTO "Tasks" (item) VALUES ($1) RETURNING *`;
	queryArray = [req.body.item];
	pool.query(insertToTable, queryArray, (err, result) => {
		if (err) throw err;
		res.locals.task = result.rows[0].item;
		return next();
	});
};
const getTasks = (req, res, next) => {
	const selectFromTable = `SELECT * FROM "Tasks";`;
	pool.query(selectFromTable, (err, result) => {
		if (err) return err;
		res.locals.items = result.rows;
		return next();
	});
};
const deleteTask = (req, res, next) => {
	console.log("hi");
	const deleteFromTable = `DELETE FROM "Tasks" WHERE ._id = $1 RETURNING *`;
	const queryArray = [req.body.item];
	pool.query(deleteFromTable, queryArray, (err, result) => {
		if (err) return err;
		res.locals.deleted = result.rows[0].item;
		return next();
	});
};

module.exports = { postTask, getTasks, deleteTask };
