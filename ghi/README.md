# Plunge

- Greg Herren
- Travis Semeniv
- Henry Kim
- Simon Conrad

Plunge - dive into a new adventure

# Design

- API design
- Data model
- ghi
- integrations

# Intended Market

Plunge is a peer-to-peer application for informal teaching, learning and community building. It is a platform for people to pursue and share their passions. We intend to foster creativity and collaboration in our communities.

# Functionality

- Visitors to the site can view existing classes from 11 categories and can choose to explore by their interests
  - visitors can narrow their search by featured classes (determined by Pluge)
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

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
