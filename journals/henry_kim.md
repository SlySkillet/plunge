## June 28, 2023

Today, I worked on:

- Setting up our Plunge project with our team.
- Adding to docker-compose.yml - volumes, postgres setup, pg-admin
- Completed designing the project database structure
- Converted from migrations-based to .sql-based setup
- Completed plunge.sql schema

Team collaboration using screen share to complete the list of tasks above. First experience working on coding as a team - great input from Greg and Simon. Followed instructions from Learn to setup the docker-compose.yml file to set up PostgreSQL. Used notes and references to create .sql file. Made a silly mistake with Git file not updating. Struggled to decide to separate locations from classes and account_details tables. Used diagram from drawsql.app to complete plunge.sql schema.

## Jun 29, 2023

Today, I worked on:

- Wrote/modified files to setup accounts queries
- Setting up authentication FastAPI authenticator
- Setting up create user functionality
- Confirm above is functional and pushed to Git

Team collaboration using screen share to complete the list of tasks above. Followed the guide from Learn to modify the docker-compose.yml and requirements.txt file to install and run JWTdown. Greg led the team through writing accounts.py - particularly the AccountQueries get and create functions. Added and modified authenticator.py router file to allow interaction with the FastAPI dashboard. Snagged on a FastAPI error issue that Travis found the solution for.
