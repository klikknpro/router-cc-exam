# Router ©

## Codecool Full-Stack API final exam project

A developmental MERN-stack web app, created heavily with React, and Express.

The app is live at: <a href="https://jellyfish-app-nhgmb.ondigitalocean.app/">Router - Better prepare</a>

- [Screenshots](#screenshots)
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

The base idea of this project is coming from personal experience. Every time I'm planning to go out for a bicycle training session (or back when I was doing food delivery) I curiously scan the sky, analyze weather forecasts and try to figure out how to best prepare. Especially if conditions look uncertain. Nobody wants to get caught in the rain, heavy wind, or choking humidity and has nothing in their pockets to ease the situation. It would be very useful to precisely foresee all the possible weather changes on your exact route planned for the day.

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
  - saved routes can be made public (for "Feed" in v2.0.0)

## Planned features of version 2.0.0

- browse public routes (shared by users)
- filter public routes
- display a "T-Factor" based on how difficult were the weather conditions on your ride
- display wind direction

## Setup requirements

- Terminal
- Visual Studio Code
- Web browser
- Node.js
- Mongo DB

## How to start (if you want to try it out in _development_ mode)

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

- fill out with your own data or ask permission from the developer

```
PORT={your preferred back-end port}
APP_URL={your front-end localhost}
CONNECTION_STRING={a local MongoDB database}

SECRET_KEY={super mega heavy secret}

LOGFLARE_SOURCE_ID={please register}
LOGFLARE_API_KEY={please register}

GOOGLE_CLIENT_ID={please register}
GOOGLE_CLIENT_SECRET={please register}
GOOGLE_REDIRECT_URI={your front-end localhost}/callback/google
```

4. Create an .env file at the frontend root

- fill out with your own data or ask permission from the developer

```
REACT_APP_MAPBOX_ACCESS_TOKEN={please register}
REACT_APP_ROUTER_PROJECT_API={your front-end localhost}/api
REACT_APP_GOOGLE_BASE_URL=https://accounts.google.com/o/oauth2/v2/auth
REACT_APP_GOOGLE_CLIENT_ID={please register}
REACT_APP_OPENWEATHER_API_KEY={please register}
```

5. Start the localhosts

```
cd backend
npm run dev
(<!-- using nodemon in development -->)
cd ../frontend
npm start
```

## Docker and Deploy

- front-end (after build), and back-end are dockerized seperately
- hosted on Docker Hub
- both Docker containers serve as sources for my Digital Ocean apps
- a MongoDB 4 database is hosted here, too

## Main technologies and services

### Front-end

JS, React \
CSS, HTML \
Mapbox GL JS Api \
OpenWeather One Call Api 3.0 \
Docker, Digital Ocean

### Back-end

Node.js, Express \
MongoDB, Mongoose \
Jest \
JWT \
Swagger \
Docker, Digital Ocean

## API documentation at Swagger

https://app.swaggerhub.com/apis/klikknpro1/router-project-api/1.0.0

## APIs used

Mapbox: https://www.mapbox.com/mapbox-gljs

OpenWeather One Call API 3.0: https://openweathermap.org/api/one-call-3

Photo at Home by <a href="https://unsplash.com/@zoltantasi?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Zoltan Tasi</a> on <a href="https://unsplash.com/s/photos/cyclist?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

Photo at Register by <a href="https://unsplash.com/@drew_beamer?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Drew Beamer</a> on <a href="https://unsplash.com/s/photos/welcome?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

## Screenshots

<img src="frontend/src/img/screenshot1.png" width="800"/>
<img src="frontend/src/img/screenshot2.png" width="800"/>
<img src="frontend/src/img/screenshot3.png" width="800"/>
