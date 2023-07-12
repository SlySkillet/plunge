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


## July 10, 2023

Today we worked on:

- Made a merge request for Auccount Details work that Greg debugged over break
- Completed Classes endpoints (get all, get one, and post) as a group
- Broke off into pairs to write Events and Reservations endpoints

We worked on Travis's screen together on the classes endpoints which got a little complicated when it comes to foreign key relationships. We will need to come back to revisit those details tomorrow. Probably going to look to the instructors for some guidance on that. Greg and I worked on writing the Events endpoints. We finished POST and GET one. We are seeing some potential problems with DateTime that we should discuss with the group and/or an instructor but, as it stands, the endpoints we've written are working. We need to be sure merging all the branches we've been working doesn't create any issues before we get too far along in writing!


## July 11, 2023

Today we worked on:

- Finished Events endpoints (put and delete)
- Merged classes and events API updates
- Worked on reservation endpoints and foreign key relations

Greg and I wrapped up or work on the events endpoints writing a put and delete method and testing that. We merged our updates to the main branch. As a team, we put our heads together to discuss strategy for reservations and all the relations we need to create to make that table work and be accessible for what we've modeled so far.
