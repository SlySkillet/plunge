# Plunge

- Greg Herren
- Travis Semeniv
- Henry Kim
- Simon Conrad

Plunge - dive into a new adventure

# Design

- [Wireframe](docs/Wireframe.png)
- [Data model](docs/data_model.png)
- [API documentation](docs/fastapi.md)

# Intended Market

Plunge is a peer-to-peer application for informal teaching, learning and community building. It is a platform for people to pursue and share their passions. We intend to foster creativity and collaboration in our communities.

# Functionality

- Visitors to the site can view existing classes from 11 categories and can choose to explore by their interests
  - visitors can narrow their search by featured classes (determined by Plunge)
  - visitors can narrow their search by the next upcoming events
  - from the 'Browse' dropdown in the navbar, visitors can explore classes offered by category
- After getting a sense for the existing classes/events, the visitors can choose to join the application and take the plunge themselves by creating an account
- All pages show classes in the form of cards displaying an image, the class title, description and address.
  - clicking the link navigates the user to a page displaying the full details of the class
  - class details includes the full class description, up to four images, class requirements, the image, name and bio of the instructor who created the class, and a link to either login (create an account) or register for a specific class time.
- A user can enter personal details to improve their experience
  - entering a location allows them to view nearby classes on the map provided on the browse-locations page, accessed from the navbar 'Browse' dropdown.
- Once authenticated, a user has access to the user features located in the pulldown in the top right corner of the navbar available on all pages.
  - Clicking reservations navigates the user to the reservations page where all upcoming and past attended classes are rendered
  - Clicking 'my profile' navigates the user to their profile page where they have the option to edit their information
  - Clicking 'instructor dashboard' navigates the user to the dashboard which is the center for actions in creating classes to offer
- When the user has navigated to the instructor dashboard there is a link to create a class. They can enter all the necessary inputs for their class, including location.
  - location is selected from a dropdown. If their desired location is not in the dropdown, a button next to the input brings up a modal where they can input the desired location. When that modal closes, their location comes up in the dropdown.
  - clicking create publishes the class and the user is prompted to schedule events for it. An event is just the meeting time for the class and many events can be created for each class.
  - all classes and events that the user has created will appear in the instructor dashboard where they have the ability to edit and delete events and classes.
  - the user can view the registration status for each class to tell how many people to expect
  - the user who has created the class can deny entry to a student if they choose to. Once denied, the instructor can change that status back to enrolled.

## Getting Started

- Install Extensions
  - [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
  - [Flake8 Formatter](https://marketplace.visualstudio.com/items?itemName=ms-python.flake8)
- Clone the repo to your machine
- Create an env file in your top level directory, following env.sample example
- Create a docker volume for the database `docker volume create plunge-data`
- Build the docker images `docker compose build`
- Build up the docker containers `docker compose up`

## Stretch Functionality

Functionality improvements we would like to make, but have not had time to do by the time of submission:

- More advanced search with fuzzy matching
- Showing an image preview on forms after a URL is added
- Add an "account setup" prompt to remind users to add more personal information after account creation
- Add a reviews component so users can review classes they've attended and prospective students can view class reviews
- Deploy the service
- Show a class details modal when a user clicks a class icon on the browse by location page
- Protect the delete event api call so only the instructor can delete an event

## Issue Tracking

We opted to use [Linear](https://linear.app/) for issue tracking. Linear supports a Gitlab integration through a webhook that associates merge requests with their relevant ticket. Below is an example of one issue and corresponding merge request for each member of the team:

- Greg:

  - [Merge Request](https://gitlab.com/hnrykm/plunge/-/merge_requests/16)
  - [Issue](https://linear.app/lucky-13/issue/LUC-59/create-class-page)
  - [Screenshot of issue](docs/greg_linear_issue.png)

- Henry:

  - [Merge Request](https://gitlab.com/hnrykm/plunge/-/merge_requests/13)
  - [Issue](https://linear.app/lucky-13/issue/LUC-44/create-register-for-event-component)
  - [Screenshot of issue](docs/henry_linear_issue.png)

- Simon:

  - [Merge Request](https://gitlab.com/hnrykm/plunge/-/merge_requests/23)
  - [Issue](https://linear.app/lucky-13/issue/LUC-50/browse-by-location)
  - [Screenshot of issue](docs/simon_linear_issue.png)

- Travis:

  - [Merge Request](https://gitlab.com/hnrykm/plunge/-/merge_requests/37)
  - [Issue](https://linear.app/lucky-13/issue/LUC-18/create-class-card-carousel-component)
  - [Screenshot of issue](docs/travis_linear_issue.png)

## How Plunge was built

Plunge was built using FastAPI and a relational database for the back-end. The front-end is React-based using a combination of bootstrap and react-bootstrap components. We also leveraged a few third-party services, such as:

- [React Google Maps API](https://www.npmjs.com/package/@react-google-maps/api) for the browse by location page
- [React Spring 3D Carousel](https://www.npmjs.com/package/react-spring-3d-carousel) for the main page hero component
- [React Slick](https://react-slick.neostack.com/docs/api/) for the main page featured, upcoming, and nearby carousels
