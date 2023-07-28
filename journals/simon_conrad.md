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

## July 18, 2023

Today we worked on:

- Browse by locations page (Simon)
- Style login and sign up modals & Nav drop-down (Greg)
- Lightbox for photo gallery (Henry)
- Hooking up carousels to /classes APIs (Travis)

Divied up tasks today to do some work independently on certain components. I workd to get google maps for react installed in the app and wired up correctly. I learned how to use a .env and .env.sample file in our app and got our map to render on the page. Next up I will be researching how to use google maps api to render pins on the map and to filter those pins to display the relevant class cards below on the page. We will likely need to make a new api call on the back end to handle all relevant classes (scheduled events in the future, not limited to 14 days like the existing 'upcoming' call).

## July 19, 2023

Today we worked on:

- Create class form & create event form (Greg)
- /reservation POST & instructor dashboard (Henry)
- Continue on browse by location and render cards (Simon)
- Set up hero component (Travis)

I worked on the location page again, working to get markers to render on the map for each class with an event in the next 14 days. I discovered that the instructions I was following were out of date with the updates made to the react library I was using. So, once I figured out that 'Marker' needed to be 'MarkerF' everything worked fine. This brought me out of a deep cavern of doubt and back on track for the maps component. After this I built the corresponding cards with class information and images and set them up to populate underneath the map. Next will be to work on filtering, styling markers, and placing a marker for a 'home address'. A stretch will be to add distinct react icons for each category.

## July 20, 2023

Today we worked on:

- a search feature for google maps

I decided to pivot on our plan for the locations browse page today because integrating google places into the app is costing me too much time. Instead I am going to filter the search results by the latitude and longitude of the corners of the map on display and center it using the location data of the user that is logged in. I will need to create a default setting if a token is not present. This will be the new MVP for this page that I believe is achievable in the time we have left for the project. I'm happy with the change and new stretch goals we drew up today. This is a story day to demonstrate agile programming in practice.

## July 23, 2023

Today we worked on:

- Edit class page & edit events page (Greg)
- Instructor dashboard & slots remaining feature (Henry)
- Open main page merge request & start on profile & edit profile (Travis)
- Continuing on location (Simon)

I continued working on the location page today. I learned how to change the marker on a google map (it has to be a url). I discovered a hack to get appropriately sized icons from flat-icons without paying. I figured out the url structure so I could produce a url for the exact image that I wanted. The map is now displaying all upcoming class events with a specific image for each category. Looks pretty good. We set out plans for the week because we're getting down to the end of our time.

## July 24, 2023

Today we worked on:

- Finishing location page
- creating card carousels for upcoming page
- creating protected routes

Because of the changes to our api routes, I had to restructure the location page to handle it. I now have it rendering correctly again. This took a ton of troubleshooting so progress was slow today. I got a carousel implemented for our upcoming page which I'm hoping can be carried over into the categories pages. Looking ahead to tomorrow, not all of our pages are finished so I'm likely going to need to do some extra hours to get our categories pages finished.

## July 25, 2023

Today we worked on:

- creating browse by category pages
- seed data

Henry is knocking out a bunch of seed data to get our site populated with images and text. Still waiting to merge the location branch in until we can get a final test on it with our test data. Category pages are created, but it's a mess of jsx code because it's creating a carousel 11 times. Need to figure out a way to refactor.

## July 26:

Today we worked on:

- merging location branch
- layout work with the cards
- final touches
- finishing main page
- geolocation

Geolocation was a failure. We're going to have to leave it for a stretch goal. We're a little bit worried about getting a main page finished in time so we're chipping in to get that wrapped up. I finsihed the upcoming classes page and the categories page.

## July 27, 2023

Today we worked on

- bugs and cleaning code
- testing and unit testing
- Move open weather api key moved
- API endpoint paths formatted - ‘/api/…’
- GET all classes to include past events
- Category page (for each category)
- Touch up cards - formatting
- Fix cards on the locations page
- Check links
- Look for bugs
- Finish the seed data
- Dashboard - order events by ascending, connect student name with profile page

We agreed on some final layout changes and I found a refactoring solution for the card browsing pages. This is huge because I can call the .jsx file I created any time we need to make a carousel. I can make edits to that jsx and change every instance of it accross all components. Huge time saver and definitely worth taking the time to figure that out. UI is a rabbitt hole and I'm trying to get the whole thing to a state I'm happy with, but it's nearly there.
