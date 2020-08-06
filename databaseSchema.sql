CREATE TABLE "Tasks"
(
 "_id"        serial NOT NULL,
 "item"       text NOT NULL,
 "created_at" timestamp with time zone NOT NULL,
 CONSTRAINT "PK_tasks" PRIMARY KEY ( "_id" )
);
