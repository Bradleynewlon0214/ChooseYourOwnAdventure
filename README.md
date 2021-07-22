## Adventure Platform
This project provides a platform for users to play, and create choose your own adventure stories. With our platform users can use an intuitive interface to create their own story or just play through existing stories on the platform.

## Demo
<p align="center">
  <img src="/images/demo.gif" alt="" />
</p>


## Technologies used
- [MongoDB](https://www.mongodb.com/)
- [Express](https://expressjs.com/)
- [React](https://reactjs.org/)
- [Node](https://nodejs.org/)

## Installation
<b>Install Nodejs and NPM</b>

`sudo apt update`

`sudo apt install nodejs`

`sudo apt install npm`

`git clone https://github.com/Bradleynewlon0214/ChooseYourOwnAdventure.git && cd ChooseYourOwnAdventure/`

<b>Running React Frontend</b>

`cd frontend/`

`npm i`

`npm start`

<b>Running Node Backened</b>

Open another terminal window.

`cd backend`

`npm i`

`npm start`

## React Dependencies
-[axios](https://github.com/axios/axios)
-[MaterialUI](https://material-ui.com/)
-[react-router](https://github.com/ReactTraining/react-router#readme)
-[redux](https://react-redux.js.org/)
-[react-rnd](https://github.com/bokuweb/react-rnd)

## Node Dependencies
-[express](https://expressjs.com/)
-[bcrypt](https://github.com/dcodeIO/bcrypt.js#readme)
-[jsonwebtoken](https://github.com/auth0/node-jsonwebtoken#readme)
-[mongoose](https://mongoosejs.com/)

## Frontend Description
The frontend is a React app using axios to make http requests, redux for session management, react router for routing, and materialui styled components. The frontend defines components for viewing a list of all adventure stories on the homepage, a component for playing through an adventure story, a component for logging in, a component for signing up, a component for viewing the users profile, and a component for creating and adding a new adventure story. The component for creating a new adventure story defines a sub-component that is used for creating each individual level of the story. The sub-component makes use of react-rnd so that the component is resizable and draggable.

## Backend Description
The backend is an Express app that creates a REST API and defines the following API endpoints. Endpoints that are to be posted to for registering a new user and logging a user in, each of which return a json webtoken provided nothing goes wrong. In terms of stories, a POST endpoint is defined for adding a new adventure story, a GET endpoint is defined for fetching all stories from the database, a GET endpoint for fetching an individual story by it's id, and a GET endpoint for fetching all stories created by a given username. To view the model schema for storing a story please see: [here](https://github.com/tdevine1/WVU_CS230_2020.08_Group08/blob/master/backend/models/Story.js)

## Credits
-[Bradley Newlon](https://github.com/Bradleynewlon0214)
-[Seth Wolfe](https://github.com/swolfezb)
-[Mubarak Alzaid](https://github.com/mubxrak)
-[Drew Griffith](https://github.com/drewgriffith123)
-[Jacob Liebau](https://github.com/Liebauski)
-[Mike Rhodes](https://github.com/mcr0016)






