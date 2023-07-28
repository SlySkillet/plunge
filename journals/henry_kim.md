## June 28, 2023

Today, I worked on:

- Setting up our Plunge project with our team.
- Adding to docker-compose.yml - volumes, postgres setup, pg-admin
- Completed designing the project database structure
- Converted from migrations-based to .sql-based setup
- Completed plunge.sql schema

Team collaboration using screen share (Henry) to complete the list of tasks above. First experience working on coding as a team - great input from Greg and Simon. Followed instructions from Learn to setup the docker-compose.yml file to set up PostgreSQL. Used notes and references to create .sql file. Made a silly mistake with Git file not updating. Struggled to decide to separate locations from classes and account_details tables. Used diagram from drawsql.app to complete plunge.sql schema.

## June 29, 2023

Today, I worked on:

- Writing/modifying files to setup accounts queries
- Setting up authentication FastAPI authenticator
- Setting up create user functionality
- Confirm above is functional and pushed to Git

Team collaboration using screen share (Greg) to complete the list of tasks above. Followed the guide from Learn to modify the docker-compose.yml and requirements.txt file to install and run JWTdown. Greg led the team through writing accounts.py - particularly the AccountQueries get and create functions. Added and modified authenticator.py router file to allow interaction with the FastAPI dashboard. Snagged on a FastAPI error issue that Travis found the solution for.

## June 30, 2023

Today, I worked on:

- Completing the authentication framework
- Setting up the API for categories and locations
- Setting up the get_one feature for account details
- Discussing project plans as a group and agreeing on expectations

Team collaboration using screen share (Simon) to complete the list of tasks above. Finished the authentication framework by watching Curtis' video and using docs. Created the queries and router files for categories, locations, and account_details. Account_details was not completed but gave us a launching point for how we'd work on our project over the break: to build up all the API requests for this table.

## July 10, 2023

Today, I worked on:

- Learning the merge request process
- Mob programming to complete the "Class" API requests
- Talked as a group about error handling
- Accessing the data of foreign keys
- Created POST, PUT, and GET (by student_id) for reservations

Team collaboration using screen share (Travis) to complete the list of tasks above. We struggled with a few points today that we'll plan to ask an instructor or SEIR about. Where do we filter results, how much detail to include in merge requests, and when/where does error handling take place? Greg wrote the code to access account first_name for the GET all requests but that unfortunately did not transfer to the POST request. Transitioning back from a week off has been a challenge. Pair programming with Travis and spent some time getting to know him.

## July 11, 2023

Today, I worked on:

- Merging classes API updates
- Merging events API updates
- Testing reservation API updates
- Learning about accessing data through foreign keys

Worked on foreign key fetch calls through SQL. Used Greg's SQL expertise from prior job.

## July 12, 2023

Today we worked on:

- Testing and merging reservation API
- Testing and merging classes API
- FrontEnd Authentication (login, logout, signup)

Worked on jwtdown for frontend authentication - more straightforward than expected.

## July 13, 2023

Today we worked on:

- Front-end navbar
- front-end class details page
- mainpage structure, class card and carousel
- Get fearured classes API

Solo work to start the class details page structure.

## July 14, 2023

Today we worked on:

- Navbar login state & Redux setup (Simon & Greg)
- Front-end class details page (Henry)
- Front-end main page structure and carousel component (Travis)

Continued class details page by using the appropriate API calls to class and events.

## July 17, 2023

Today we worked on:

- Redux mutations for Login (Simon & Greg)
- Create class page (Greg)
- Footer (Simon)
- Front-end class details page & lightbox for photo gallery (Henry)
- Front-end main page structure and carousel component (Travis)

Continued class details page and trying to get the lightbox situation figured out. In the process of learning about the lightbox, I was able to understand modals.

## July 18, 2023

Today we worked on:

- Browse by locations page (Simon)
- Style login and sign up modals & Nav drop-down (Greg)
- Lightbox for photo gallery (Henry)
- Hooking up carousels to /classes APIs (Travis)

Worked with Greg to develop the modal to login and create an account.

## July 19, 2023

Today we worked on:

- Create class form & create event form (Greg)
- /reservation POST & instructor dashboard (Henry)
- Continue on browse by location and render cards (Simon)
- Set up hero component (Travis)

Finished the class details page. Moved into building the instructor dashboard and the API requests.

## July 20, 2023

Today we worked on:

- Instructor dashboard

Explored the use of the bootstrap react accordion for better user experience.

## July 23, 2023

Today we worked on:

- Edit class page & edit events page (Greg)
- Instructor dashboard & slots remaining feature (Henry)
- Open main page merge request & start on profile & edit profile (Travis)
- Continuing on location (Simon)

Continued work with the instructor dashboard and the logic behind slots remaining using a WITH SQL command help from Greg.

## July 24, 2023

Today we worked on:

- Finishing location page
- creating card carousels for upcoming page
- creating protected routes

Worked on adding a location modal form to add to create event and edit profile.

## July 25, 2023

Today we worked on:

- creating browse by category pages
- seed data

Spent time populating seed data in a spreadsheet and helping team mates with tasks.

## July 26:

Today we worked on:

- merging location branch
- layout work with the cards
- final touches
- finishing main page
- geolocation

Spent some time with Simon geolocation. Worked with Greg with simultaneous account detail creation.

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

Finished seed data. Made tweaks exposed by the data. Helped team mates with bugs and merging.

## July 28, 2023

Today we worked on

- Finishing touches
- Unit Tests
- README.md

Created graphics for hero carousel. Helped team mates with their merge. Applied logo to the website and overall last minute tweaks.
