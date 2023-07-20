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
    username VARCHAR(100) NOT NULL UNIQUE,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL
);

CREATE TABLE account_details (
    id SERIAL NOT NULL UNIQUE,
    account_id INTEGER REFERENCES accounts("id") ON DELETE CASCADE NOT NULL,
    avatar VARCHAR(100),
    phone_number BIGINT,
    biography TEXT,
    mock_credit_card VARCHAR(100),
    interests INTEGER REFERENCES categories("id") ON DELETE CASCADE,
    location_id SMALLINT REFERENCES locations("id") ON DELETE CASCADE
);

CREATE TABLE classes (
    id SERIAL NOT NULL UNIQUE,
    class_name VARCHAR(100) NOT NULL,
    instructor_id INTEGER REFERENCES accounts("id") ON DELETE CASCADE NOT NULL,
    requirements TEXT NOT NULL,
    category_id SMALLINT REFERENCES categories("id") ON DELETE CASCADE NOT NULL,
    description TEXT NOT NULL,
    price SMALLINT NOT NULL,
    featured BOOLEAN,
    image_1 VARCHAR(100) NOT NULL,
    image_2 VARCHAR(100),
    image_3 VARCHAR(100),
    image_4 VARCHAR(100),
    location_id SMALLINT REFERENCES locations("id") ON DELETE CASCADE NOT NULL
);

CREATE TABLE events (
    id SERIAL NOT NULL UNIQUE,
    date_time TIMESTAMP NOT NULL,
    capacity SMALLINT NOT NULL,
    class_id INTEGER REFERENCES classes("id") ON DELETE CASCADE NOT NULL
);

CREATE TABLE reservations (
    id SERIAL NOT NULL UNIQUE,
    total_price NUMERIC NOT NULL,
    status BOOLEAN NOT NULL DEFAULT true,
    event_id SMALLINT REFERENCES events("id") ON DELETE CASCADE NOT NULL,
    class_id SMALLINT REFERENCES classes("id") ON DELETE CASCADE NOT NULL,
    student_id SMALLINT REFERENCES accounts("id") ON DELETE CASCADE NOT NULL
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

INSERT INTO accounts (username, first_name, last_name, email, password) VALUES ('gherren', 'Greg', 'Herren', 'gherren@email.com', '$2b$12$2sNz/yfCtdbfJ8p5C4Dl2.3BoZQRZiRRPvXgtBrBkzzL1HJyloAyG')
, ('sconrad', 'Simon', 'Conrad', 'sconrad@email.com', '$2b$12$2sNz/yfCtdbfJ8p5C4Dl2.3BoZQRZiRRPvXgtBrBkzzL1HJyloAyG')
, ('tsemeniv', 'Travis', 'Semeniv', 'tsemeniv@email.com', '$2b$12$2sNz/yfCtdbfJ8p5C4Dl2.3BoZQRZiRRPvXgtBrBkzzL1HJyloAyG')
, ('hkim', 'Henry', 'Kim', 'hkim@email.com', '$2b$12$2sNz/yfCtdbfJ8p5C4Dl2.3BoZQRZiRRPvXgtBrBkzzL1HJyloAyG')
, ('kporter', 'Khalid', 'Porter', 'kporter@email.com', '$2b$12$2sNz/yfCtdbfJ8p5C4Dl2.3BoZQRZiRRPvXgtBrBkzzL1HJyloAyG')
, ('enguyen', 'Ellen', 'Nguyen', 'enguyen@email.com', '$2b$12$2sNz/yfCtdbfJ8p5C4Dl2.3BoZQRZiRRPvXgtBrBkzzL1HJyloAyG')
, ('cpatrick', 'Claire', 'Patrick', 'cpatrick@email.com', '$2b$12$2sNz/yfCtdbfJ8p5C4Dl2.3BoZQRZiRRPvXgtBrBkzzL1HJyloAyG')
, ('lgray', 'Louie', 'Gray', 'lgray@email.com', '$2b$12$2sNz/yfCtdbfJ8p5C4Dl2.3BoZQRZiRRPvXgtBrBkzzL1HJyloAyG')
, ('charrell', 'Corey', 'Harrell', 'charrell@email.com', '$2b$12$2sNz/yfCtdbfJ8p5C4Dl2.3BoZQRZiRRPvXgtBrBkzzL1HJyloAyG')
, ('kyork', 'Kelsie', 'York', 'kyork@email.com', '$2b$12$2sNz/yfCtdbfJ8p5C4Dl2.3BoZQRZiRRPvXgtBrBkzzL1HJyloAyG');

INSERT INTO locations (name, address, city, state, zip_code) VALUES ('Culpepper Community Center', '91 Clinton St', 'Culpepper', 'VA', '22701')
, ('Jackson & Sons Auto', '7467 Market St', 'Cocoa', 'FL', '32927')
, ('Mary Ellis Park', '7668 Grand Ave', 'Dacula', 'GA', '30019');

INSERT INTO account_details (account_id, avatar, phone_number, biography, mock_credit_card, interests, location_id) VALUES (1, 'https://pbs.twimg.com/profile_images/1237550450/mstom_400x400.jpg', 5551234567, 'I like turtles', '1234567887654321', 1, 1)
, (2, 'https://place-puppy.com/500x500', 5551111111, 'i like dogs', '2234567887654321', 2, 2)
, (3, 'https://place-puppy.com/500x500', 5552222222, 'i like cats', '3234567887654321', 3, 3)
, (4, 'https://place-puppy.com/500x500', 5553333333, 'i like orangutans', '4234567887654321', 4, 1)
, (5, 'https://place-puppy.com/500x500', 5554444444, 'i like spiders', '5234567887654321', 5, 2)
, (6, 'https://place-puppy.com/500x500', 5555555555, 'i like baseball', '6234567887654321', 6, 3)
, (7, 'https://place-puppy.com/500x500', 5556666666, 'i like lemonade', '7234567887654321', 7, 1)
, (8, 'https://place-puppy.com/500x500', 5557777777, 'i like pasta', '8234567887654321', 8, 2)
, (9, 'https://place-puppy.com/500x500', 5558888888, 'i like soup', '9234567887654321', 9, 3)
, (10, 'https://place-puppy.com/500x500', 5559999999, 'i like knitting', '1034567887654321', 10, 1);
