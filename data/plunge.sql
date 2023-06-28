DROP TABLE IF EXISTS accounts;
DROP TABLE IF EXISTS events;

CREATE TABLE locations (
    id SERIAL NOT NULL UNIQUE,
    name VARCHAR NOT NULL,
    address VARCHAR NOT NULL,
    city VARCHAR NOT NULL,
    state VARCHAR NOT NULL,
    zip_code SMALLINT NOT NULL,
    latitude VARCHAR,
    longitude VARCHAR
)

CREATE TABLE categories (
    id SERIAL NOT NULL UNIQUE,
    name VARCHAR NOT NULL
)


CREATE TABLE accounts (
    id SERIAL NOT NULL UNIQUE,
    username VARCHAR NOT NULL,
    first_name VARCHAR NOT NULL,
    last_name VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
)

-- CREATE TABLE account_details (
--     id SERIAL NOT NULL UNIQUE,
--     account_id INTEGER REFERENCES accounts("id") ON DELETE CASCADE,
--     avatar VARCHAR,
--     phone_number INTEGER,
--     biography TEXT,
--     mock_credit_card VARCHAR,
--     interests

-- )

-- CREATE TABLE events (
--     id SERIAL NOT NULL UNIQUE,
--     date_time TIMESTAMP NOT NULL,
--     capacity SMALLINT NOT NULL,
--     class_id INT REFERENCES classes("id") ON DELETE CASCADE
-- )

-- CREATE TABLE classes (
--     id SERIAL NOT NULL UNIQUE,

-- )