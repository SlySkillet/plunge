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
