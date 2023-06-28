CREATE TABLE "Classes"(
    "id" SERIAL NOT NULL,
    "class_name" VARCHAR(255) NOT NULL,
    "instructor_id" SMALLINT NOT NULL,
    "requirements" VARCHAR(255) NOT NULL,
    "category" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "price" SMALLINT NOT NULL,
    "location_id" SMALLINT NOT NULL,
    "featured" BOOLEAN NOT NULL,
    "image_1" VARCHAR(255) NOT NULL,
    "image_2" VARCHAR(255) NOT NULL,
    "image_3" VARCHAR(255) NOT NULL,
    "image_4" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "Classes" ADD PRIMARY KEY("id");
CREATE TABLE "Categories"(
    "id" BIGINT NOT NULL,
    "name" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "Categories" ADD PRIMARY KEY("id");
CREATE TABLE "Accounts"(
    "id" SERIAL NOT NULL,
    "username" VARCHAR(255) NOT NULL,
    "first_name" VARCHAR(255) NOT NULL,
    "last_name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "Accounts" ADD PRIMARY KEY("id");
CREATE TABLE "Events"(
    "id" SERIAL NOT NULL,
    "class_id" BIGINT NOT NULL,
    "date_time" DATE NOT NULL,
    "capacity" SMALLINT NOT NULL
);
ALTER TABLE
    "Events" ADD PRIMARY KEY("id");
CREATE TABLE "Account Details"(
    "id" BIGINT NOT NULL,
    "avatar" VARCHAR(255) NULL,
    "phone_number" SMALLINT NULL,
    "biography" TEXT NULL,
    "mock_credit_card" VARCHAR(255) NULL,
    "interests" VARCHAR(255) NULL
);
ALTER TABLE
    "Account Details" ADD PRIMARY KEY("id");
CREATE TABLE "Reservations"(
    "id" SERIAL NOT NULL,
    "event_id" SMALLINT NOT NULL,
    "class_id" SMALLINT NOT NULL,
    "student_id" SMALLINT NOT NULL,
    "total_price" SMALLINT NOT NULL,
    "status" BOOLEAN NOT NULL
);
ALTER TABLE
    "Reservations" ADD PRIMARY KEY("id");
ALTER TABLE
    "Events" ADD CONSTRAINT "events_class_id_foreign" FOREIGN KEY("class_id") REFERENCES "Classes"("id");
ALTER TABLE
    "Account Details" ADD CONSTRAINT "account details_interests_foreign" FOREIGN KEY("interests") REFERENCES "Categories"("name");
ALTER TABLE
    "Account Details" ADD CONSTRAINT "account details_id_foreign" FOREIGN KEY("id") REFERENCES "Accounts"("id");
ALTER TABLE
    "Reservations" ADD CONSTRAINT "reservations_student_id_foreign" FOREIGN KEY("student_id") REFERENCES "Accounts"("id");
ALTER TABLE
    "Classes" ADD CONSTRAINT "classes_category_foreign" FOREIGN KEY("category") REFERENCES "Categories"("name");
ALTER TABLE
    "Classes" ADD CONSTRAINT "classes_instructor_id_foreign" FOREIGN KEY("instructor_id") REFERENCES "Accounts"("id");
ALTER TABLE
    "Reservations" ADD CONSTRAINT "reservations_class_id_foreign" FOREIGN KEY("class_id") REFERENCES "Classes"("id");
ALTER TABLE
    "Reservations" ADD CONSTRAINT "reservations_event_id_foreign" FOREIGN KEY("event_id") REFERENCES "Events"("id");