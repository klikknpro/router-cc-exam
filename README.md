# Router ©

## Codecool Full-Stack API final exam project

A developmental MERN-stack web app, created heavily with React, and Express.

- [User story](#user-story)
- [Theme of the project](#theme-of-the-project)
- [Features of version 1.0.0](#features-of-version-1.0.0)
- [Planned features of version 2.0.0](#planned-features-of-version-2.0.0)
- [Setup requirements](#setup-requirements)
- [How to start](#how-to-start)
- [Docker and Deploy](#docker-and-deploy)
- [Main technologies and services](#main-technologies-and-services)
- [API documentation at Swagger](#api-documentation-at-swagger)
- [APIs used](#apis-used)

## User story

```
"As a cyclist, I want to see how the weather will change on my ride, so I can better prepare."
```

## Theme of the project

The base idea of this project is coming from personal experience. Every time I'm planning to go out for a bicycle training session (or back when I was doing food delivery) I curiously scan the sky, analyze weather forecasts and try to figure out how to best prepare. Especially if conditions look uncertain. Nobody wants to get caught by rain, heavy wind, or choking humidity and has nothing in their pockets to ease your situation. It would be very useful to foresee all the possible weather changes on your exact route planned for the day.

## Features of version 1.0.0

- geolocate the user on site load
- draw your route in an integrated Mapbox map (using points)
- the app gives you a recommended route (without navigation)
- OpenWeather provides 4 or 5 forecast points along your route
  - at the exact time the map estimates you to be there
  - including: sky conditions, temperature (metric), wind speed, humidity, expected volume of rain
- users can login using their Google account
  - and register with a username
- logged in users can save this route (with all relevant data) into their private profile page
  - saved routes can be edited

## Planned features of version 2.0.0

- loading mask while the map is loading
- browse public routes (shared by users)
- filter public routes
- display a "T-Factor" based on how difficult were the weather conditions on your ride
- display wind direction
- display a map for each saved route (on My Routes)
  - possibly with weather data

## Setup requirements

- Terminal
- Visual Studio Code
- Web browser
- Node.js
- Mongo DB

## How to start

1. Clone the repository and open with Visual Studio Code

2. Using the terminal:

```
cd backend
npm install
cd ../frontend
npm install
cd ..
```

3. Create an .env file at the backend root

- fill out with your own data

```
PORT=8080
APP_URL=http://localhost:3000
CONNECTION_STRING=

SECRET_KEY=

LOGFLARE_SOURCE_ID=
LOGFLARE_API_KEY=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URI=http://localhost:3000/callback/google
```

4. Create an .env file at the frontend root

- fill out with your own data

```
REACT_APP_MAPBOX_ACCESS_TOKEN=
REACT_APP_ROUTER_PROJECT_API=http://localhost:8080/api
REACT_APP_GOOGLE_BASE_URL=https://accounts.google.com/o/oauth2/v2/auth
REACT_APP_GOOGLE_CLIENT_ID=
REACT_APP_OPENWEATHER_API_KEY=
```

5. Start the localhosts

```
cd frontend
npm start
cd ../backend
npm run dev
cd ..
```

## Docker and Deploy

... under development.

## Main technologies and services

### Front-end

JS, React \
CSS, React Bootstrap, Material UI \
Mapbox GL JS Api \
OpenWeather One Call Api 3.0 \
(Docker)

### Back-end

Node.js, Express \
MongoDB, Mongoose \
Jest \
JWT \
Swagger \
(Docker)

## API documentation at Swagger

https://app.swaggerhub.com/apis/klikknpro1/router-project-api/1.0.0

## APIs used

Mapbox: https://www.mapbox.com/mapbox-gljs

OpenWeather One Call API 3.0: https://openweathermap.org/api/one-call-3
