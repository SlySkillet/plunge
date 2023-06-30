## June 28, 2023

Today, I worked on:

- Basic project set up

All of us collaborated as a group doing mob programming on Henry's laptop via screenshare. We set up the database, created the docker-compose.yaml, requirements.txt, and dockerfile.dev. Then we started laying out the table schemas in the plunge.sql file.

## June 29, 2023

Today, I worked on:

- Table set up and authentication

We did mob-programming again today, this time on my laptop. Henry did some work over the evening to finish setting up the table schemas in the plunge.sql file, so we started by reviewing that and making sure we all understood how it worked. From there, we followed the steps in the Authentication video on Learn to set up the jwtdown-fastapi auth flow. At the end of the day, we had just gotten the /token POST call working.

## June 30, 2023

Today, I worked on:

- Finishing setting up Auth
- Setting up /categories and /locations API

Another day of mob-programming. This time we started by finishing up the Auth work we had leftover from yesterday, testing the /token GET call. Then we set up the /categories and /locations API calls and wrote some insert SQL statements to populate those tables with data. Lastly, we started working on the /account_details API, but didn't finish. Over summer break, we're all going to individually get the /account_details API up and running.
