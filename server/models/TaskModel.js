const { Pool } = require("pg");
// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
const myURI =
	"postgres://oxlmwbyi:qjVtW5CjYZLfUEIlQgqCybyWZQTSGxdj@salt.db.elephantsql.com:5432/oxlmwbyi";
// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;
const pool = new Pool({ connectionString: URI });
function CreateTable() {
	let createTable = ` CREATE TABLE IF NOT EXISTS "Tasks" (
	"_id" serial NOT NULL,
	"item" varchar NOT NULL,
	"created_at" TIMESTAMP default current_timestamp,
	CONSTRAINT "Tasks_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);
`;
	pool.query(createTable);
}

module.exports = {
	CreateTable
}; // <-- export your model
