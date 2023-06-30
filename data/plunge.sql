DROP TABLE IF EXISTS locations;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS accounts;
DROP TABLE IF EXISTS account_details;
DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS classes;
DROP TABLE IF EXISTS reservations;

CREATE TABLE locations (
    id SERIAL NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(100) NOT NULL,
    city VARCHAR(50) NOT NULL,
    state VARCHAR(50) NOT NULL,
    zip_code INT NOT NULL,
    latitude VARCHAR(100),
    longitude VARCHAR(100)
);

CREATE TABLE categories (
    id SERIAL NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE accounts (
    id SERIAL NOT NULL UNIQUE,
    username VARCHAR(100) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL
);

CREATE TABLE account_details (
    id SERIAL NOT NULL UNIQUE,
    account_id INTEGER REFERENCES accounts("id") ON DELETE CASCADE,
    avatar VARCHAR(100),
    phone_number INTEGER,
    biography TEXT,
    mock_credit_card VARCHAR(100),
    interests INTEGER REFERENCES categories("id") ON DELETE CASCADE,
    location_id SMALLINT REFERENCES locations("id") ON DELETE CASCADE
);

CREATE TABLE classes (
    id SERIAL NOT NULL UNIQUE,
    class_name VARCHAR(100) NOT NULL,
    instructor_id INTEGER REFERENCES accounts("id") ON DELETE CASCADE,
    requirements TEXT NOT NULL,
    category_id SMALLINT NOT NULL,
    description TEXT NOT NULL,
    price SMALLINT NOT NULL,
    featured BOOLEAN NOT NULL,
    image_1 VARCHAR(100) NOT NULL,
    image_2 VARCHAR(100),
    image_3 VARCHAR(100),
    image_4 VARCHAR(100),
    location_id SMALLINT REFERENCES locations("id") ON DELETE CASCADE
);

CREATE TABLE events (
    id SERIAL NOT NULL UNIQUE,
    date_time TIMESTAMP NOT NULL,
    capacity SMALLINT NOT NULL,
    class_id INTEGER REFERENCES classes("id") ON DELETE CASCADE
);

CREATE TABLE reservations (
    id SERIAL NOT NULL UNIQUE,
    total_price NUMERIC NOT NULL,
    status BOOLEAN NOT NULL DEFAULT true,
    event_id SMALLINT REFERENCES events("id") ON DELETE CASCADE,
    class_id SMALLINT REFERENCES classes("id") ON DELETE CASCADE,
    student_id SMALLINT REFERENCES accounts("id") ON DELETE CASCADE
);

INSERT INTO categories (name) VALUES ('Music')
, ('Design & Style')
, ('Arts & Entertainment')
, ('Business')
, ('Sports & Gaming')
, ('Writing')
, ('Science & Tech')
, ('Home & Lifestyle')
, ('Community & Government')
, ('Health & Wellness')
, ('Food');

INSERT INTO accounts (username, first_name, last_name, email, password) VALUES ('gherren', 'Greg', 'Herren', 'gherren@email.com', 'password')
, ('sconrad', 'Simon', 'Conrad', 'sconrad@email.com', 'password')
, ('tsemeniv', 'Travis', 'Semeniv', 'tsemeniv@email.com', 'password')
, ('hkim', 'Henry', 'Kim', 'hkim@email.com', 'password')
, ('kporter', 'Khalid', 'Porter', 'kporter@email.com', 'password')
, ('enguyen', 'Ellen', 'Nguyen', 'enguyen@email.com', 'password')
, ('cpatrick', 'Claire', 'Patrick', 'cpatrick@email.com', 'password')
, ('lgray', 'Louie', 'Gray', 'lgray@email.com', 'password')
, ('charrell', 'Corey', 'Harrell', 'charrell@email.com', 'password')
, ('kyork', 'Kelsie', 'York', 'kyork@email.com', 'password');
