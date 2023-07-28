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

## July 10, 2023

- Set up /classes API
- Set up /events API

We collaborated as a group with Travis leading to set up the classes GET, POST, PUT, and DELETE calls. Then Simon and I paired (with Simon leading) to work on the events GET and POST calls.

## July 11, 2023

- Set up /events API
- Modified /classes API

We spent a bit of time as a group figuring out how to do merge requests, then merged in yesterday’s changes to the /classes APIs. Then we broke into pairs and Simon and I finished the /events PUT and DELETE calls from yesterday. We opened a merge request and merged those changes back into main as well. At the end of the day, I made some more updates the /classes GET calls to include category_name and location details instead of just id values.

## July 12, 2023

- Set up front end authentication

We reconvened as a group to review the results of yesterday’s breakouts, then we tackled front-end authentication mob-programming style with me typing. We were able to successfully build a login page, sign up page, and logout button.

## July 13, 2023

- Set up GET /classes?feed=featured
- Set up GET /classes?feed=upcoming
- Set up GET /classes?feed=nearby
- Set up GET /classes?category={category_id}

We split out on our own to do some solo-coding today. I opted to focus on building out a few more routes for the GET /classes api that will serve the main page and the category-specific pages. It was satisfying to be able to leverage my SQL experience today!

## July 14, 2023

- Integrated Redux
- Figured out how to pull & store token and account information in Redux store

Simon and I paired today to work through setting up Redux. We spent quite a while trying to get all of the kinks ironed out, but eventually we were able to figure out how to configure useGetTokenQuery to load and store token and account info. We’re going to work on the login mutation on Monday.

## July 17, 2023

- Integrated Redux
- Updated navbar to use Redux store
- Worked on login modal

Simon and I got Redux working for the login flow. We then updated the navbar to show a login or logout button based on data in the Redux store. In the afternoon, we started working on adapting the login page to a login modal and ended up getting stuck on proper modal dismissal. Will carry over into tomorrow.

## July 18, 2023

- Resolved outstanding dismissal issues with the login modal
- Set up a create account modal w/ error handling
- Integrated the /account POST call with Redux so /token GET runs after account creation

Henry and I paired today to work on resolving the login modal dismissal issues and setting up the create account modal. It was a tough day, but I’m pleased with the progress we made. And I learned some really useful HTML tips from Henry.

## July 19, 2023

- Finished Navbar dropdown and opened MR for login, create account, and navbar changes
- Set up create class form
- Set up create event form

Mostly just grinding today. Spent a while figuring out some form-floating formatting things for the classes form. Events form is a work in progress. The form works, but I need to integrate some class details in a more user-friendly way.

## July 20, 2023

- Finished create class form & create event form
- Started my events page

I finished formatting the class card on the events form. Then I added a bunch of error handling to both the backend and frontend for the events and classes forms. Lastly, I started work on the my events page.

## July 24, 2023

- Finished my events page
- Helped troubleshoot main page carousel loading issue
- Finished edit class and edit events pages
- Started on user profile page

I wrapped up my work on the my events page, now renamed the reservations page, by adding some error handling. I spent a bit of the early afternoon paired with Travis troubleshooting a carousel loading issue on the main page. Then later in the afternoon, I modified the create class and create events pages to support editing as well. Lastly, I started building the user profile page.

## July 25, 2023

- Finished user profile page
- Finished edit profile page
- Helped troubleshoot various issues

I finished and merged in the user profile page in the morning, then started work on the edit profile page. I spent quite a while figuring out how to handle formatting the phone number and mock credit card number fields, but eventually got it working. My progress in the afternoon was a bit slower as we had a number of merge requests, demos, and general troubleshooting sessions but I was able to wrap up the edit profile page by EOD.

## July 26, 2023

- Paired with Henry to ensure an account details record is created after an account is created
- Protected the classes, events, account details, and reservation routes so they can only be used by the relevant owner

Busy day! This morning Henry and I paired to update the create account back-end to ensure an account_details record is created when an account is created. Then I spent a long while working through protecting routes using the authorization bearer token.

## July 27, 2023

- Code cleanup
- Set up unit test for classes get one

I spent a long time today working through each file in the project, removing hardcoded urls, removing commented out code, unused imports, etc. I also renamed all of the api routes to follow a restful format. In the afternoon, I spent a while working through setting up our first unit test for the project.
