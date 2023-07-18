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

- finishing put and delete endpoints for events
- merging updates from yesterday
- Work on reservations endpoints and foreign key relations

Greg and I worked together to complete our tasks from yesterday - the put and delete endpoints for events api. We got together as a group to review our progress and merge our branches to the main branch. After that we discussed how we should approach the foreign key relations for the reservations table which will be the base for a lot of our functionality in the app.

## July 12, 2023

Today we worked on:

- Testing and merging reservation API
- Testing and merging classes API
- FrontEnd Authentication (login, logout, signup)

After testing and merging Henry and Greg's work from yesterday we decided to tackle the front end authentication as a group. We are working with the galvanized library jwtdown for react. We had to troubleshoot some connections in Docker-compose.yaml. Once we got that figured out, we were able to complete the most basic login, logout and signup functionality on the frontend with jwt tokens.

## July 13, 2023

Today we worked on:

- Front-end navbar
- front-end class details page
- mainpage structure, class card and carousel
- Get fearured classes API

We broke off into groups to tackle some of these tickets individually. I worked on building out the navbar with bootstrap. This is a preliminary navbar for our application. In building this we realized that we will need to get redux into our app so that we can access global state, whether a user is logged in in particular. User data will be relevant to several components of the application but the immediate need will be to toggle the login button with a username and avatar and a dropdown with links to logout and other user actions.

## July 14, 2023

Today we worked on:

- Navbar login state & Redux setup (Simon & Greg)
- Front-end class details page (Henry)
- Front-end main page structure and carousel component (Travis)

Greg and I worked together on getting a redux store set up so we can access user data accross the application. This was a challenge. In the end, we successfully got the token to show up in our redux dev-tools but we cannot access the account data that we need. Outside of group work time I have been studying the redux docs and tutorials and Curtis's videos to better understand redux with react.

## July 17, 2023

Today we worked on:

- Redux mutations for Login (Simon & Greg)
- Create class page (Greg)
- Footer (Simon)
- Front-end class details page & lightbox for photo gallery (Henry)
- Front-end main page structure and carousel component (Travis)

Today we got the navbar to toggle the login button depending on if the user is logged in. We can get the userdata to display in our UI, but we haven't implemented it. Account data is coming up the way we need in redux dev tools, so we are tracking. We worked on changing the login-page to a modal which took some troubleshooting. I created a draft of a footer today and merged it into main so we can, at least, see what the page looks like with header and footer. It is a template so we can easily add more links and content as we wish later on.
