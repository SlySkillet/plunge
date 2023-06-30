## June 28, 2023

Today I worked on:

- the Docker.yaml file to get our containers running

Travis, Henry, Greg and I worked together, following instructions in the project setup to get our Docker Containers running. Now that we have our development environment created we can begin building out table in the database.

Today was my first experience setting up a SQL database in Docker. I'm happy it went smoothly.


## June 29, 2023

Today we worked on:

- getting our authorization flow in place

Together, we referenced Curtis's video on how to use the galvanized jwtdown-fastapi library and applied made some changes so that it would fit our project. At this point we have a post method to create account and login and a logout methods. Tomorrow we will complete our set up of the jwtdown-fastapi library in Plunge.

We learned today to pay close attention to our urls - fastAPI swagger is at localhost:8000/docs NOT localhost:8000.

## June 30, 2023

Today we worked on:

- finishing authorization
- creating our first endpoints
- seeded database

We worked together to get our first endpoints built, referencing the vacations exploration. We are running into a bug now with creating endpoints that have foreign keys. We also seeded our database with some data to work with so we don't need to manually reenter data every time we rebuild docker containers and images.

I learned to build endpoints in FastAPI and to run SQl queries in pg-admin console.
