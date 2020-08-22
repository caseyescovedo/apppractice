CREATE TABLE Tasks
(
  "taskid" serial PRIMARY KEY,
  "item" varchar NOT NULL,
  "created_at" time NOT NULL,
  UNIQUE (item)
);

-- SELECT setval('users_userid_seq', 1, false);

-- DROP TABLE Tasks

-- INSERT INTO Tasks
--   (item, created_at)
-- VALUES('test', 'dangernoodle123')

-- psql -d postgres://kadbduba:SY3ImUHiCElCe0qpxj7a7lcN8X0olYrR@lallah.db.elephantsql.com:5432/kadbduba -f create.sql