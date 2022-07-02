import http from "axios";

const forecast = async (route) => {
  let allCheckpoints = [];
  let sumDuration = 0;
  const reqTimestamp = Math.round(Math.round(Date.now() / 1000) / 60) * 60;
  const legs = route.legs;

  for (const leg of legs) {
    for (const step of leg.steps) {
      const last = step.geometry.coordinates.length - 1;
      sumDuration += step.duration;
      const roundToMinutes = Math.round(sumDuration / 60) * 60;
      const checkpoint = {
        coordinate: step.geometry.coordinates[last], // [lng, lat]
        duration: Math.round(sumDuration), // in seconds
        timestamp: reqTimestamp + roundToMinutes,
      };
      allCheckpoints.push(checkpoint);
    }
  }

  const quarterWay = Math.round(allCheckpoints.length / 4);
  const weatherCheckpoints = [
    allCheckpoints[0],
    allCheckpoints[quarterWay],
    allCheckpoints[quarterWay * 2],
    allCheckpoints[quarterWay * 3],
    allCheckpoints[allCheckpoints.length - 1],
  ];
  console.log(weatherCheckpoints);

  let markers = [];
  for (const checkpoint of weatherCheckpoints) {
    const response = await http.get(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${checkpoint.coordinate[1]}&lon=${checkpoint.coordinate[0]}&units=metric&exclude=daily,alerts&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`
    );

    console.log("checkpoint timestamp", checkpoint.timestamp);
    const lastMinutely = response.data.minutely[60].dt;
    console.log("lastMinutely", lastMinutely);

    if (checkpoint.timestamp <= lastMinutely) {
      console.log("minutely");
      for (const minute of response.data.minutely) {
        if (minute.dt === checkpoint.timestamp) {
          markers.push({
            coordinate: checkpoint.coordinate,
            precipitation: minute.precipitation,
            temp: response.data.hourly[0].temp,
            humidity: response.data.hourly[0].humidity,
            windSpeed: response.data.hourly[0].wind_speed,
            windDirection: response.data.hourly[0].wind_deg,
            description: response.data.hourly[0].weather[0].description,
            icon: `http://openweathermap.org/img/wn/${response.data.hourly[0].weather[0].icon}@2x.png`,
          });
        }
      }
    } else {
      console.log("hourly");
      for (let hour = 0; hour < 8; hour++) {
        // maximize the duration of a ride in 8 hours
        if (
          response.data.hourly[hour] < checkpoint.timestamp &&
          response.data.hourly[hour + 1] > checkpoint.timestamp
        ) {
          markers.push({
            coordinate: checkpoint.coordinate,
            precipitation: null,
            temp: response.data.hourly[hour].temp,
            humidity: response.data.hourly[hour].humidity,
            windSpeed: response.data.hourly[hour].wind_speed,
            windDirection: response.data.hourly[hour].wind_deg,
            description: response.data.hourly[hour].weather[0].description,
            icon: `http://openweathermap.org/img/wn/${response.data.hourly[hour].weather[0].icon}@2x.png`,
          });
        }
      }
    }
  }
  console.log(markers);
};

export default forecast;
