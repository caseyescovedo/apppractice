CREATE TABLE tasks (
  id          serial        PRIMARY KEY, 
  item        varchar(1024) NOT NULL,
  created_at  timestamp     NOT NULL DEFAULT now()
);