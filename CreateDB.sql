CREATE TABLE Tasks (
    _id serial PRIMARY KEY,
    item varchar(255),
    created_at TIMESTAMPTZ DEFAULT NOW()
);