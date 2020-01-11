CREATE TABLE "users" (
	"user_id" serial NOT NULL,
	"user" varchar(255) NOT NULL,
	"pass" varchar(255) NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("user_id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "tasks" (
	"task_id" serial NOT NULL,
	"item" varchar(255) NOT NULL,
	"created_at" TIME NOT NULL,
	"user_id" integer NOT NULL,
	CONSTRAINT "tasks_pk" PRIMARY KEY ("task_id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "tasks" ADD CONSTRAINT "tasks_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("user_id");
