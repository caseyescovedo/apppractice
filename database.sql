CREATE TABLE users
(
    "userid" serial PRIMARY KEY,
    "user" varchar NOT NULL,
    "password" varchar NOT NULL,
    UNIQUE("user")
);



CREATE TABLE task
(
    "taskid" serial PRIMARY KEY,
    "item" varchar NOT NULL CHECK
(item <> ''),
    "completed" boolean NOT NULL,
    "user" varchar NOT NULL,
    "created_at" varchar NOT NULL,
    UNIQUE("item"),
    FOREIGN KEY("user") REFERENCES users ("user")

)

INSERT INTO users
    (user, password)
VALUES('moopoint@gmail.com', 'joey')

INSERT INTO task
    (item, completed, user ,created_at)
VALUE
('hugsy',
true,
'moopoint@gmail.com','ten'
)