CREATE TABLE Task (
  "_id" UUID PRIMARY KEY,
  "item" varchar NOT NULL,
  "created_at" date DEFAULT NOW()
);