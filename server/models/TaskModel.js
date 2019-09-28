const { Pool } = require('pg');
const myURI = '';
const URI = process.env.PG_URI || myURI;

const pool = new Pool({ connectionString: URI });

const creation = `CREATE TABLE IF NOT EXISTS "Task" (
	"_id" serial NOT NULL,
	"item" varchar(255) NOT NULL,
	"created_at" TIMESTAMP NOT NULL,
	CONSTRAINT "Task_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);`;

(async () => {
  try {
    await pool.query(creation);
  } catch (error) {
    console.error(error);
  }
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
