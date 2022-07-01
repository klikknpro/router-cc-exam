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
    // allCheckpoints[quarterWay],
    // allCheckpoints[quarterWay * 2],
    // allCheckpoints[quarterWay * 3],
    // allCheckpoints[allCheckpoints.length - 1],
  ];
  console.log(weatherCheckpoints);

  let markers = [];
  for (const checkpoint of weatherCheckpoints) {
    const response = await http.get(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${weatherCheckpoints[0].coordinate[1]}&lon=${weatherCheckpoints[0].coordinate[0]}&units=metric&exclude=daily,alerts&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`
    );

    const lastMinutely = response.data.minutely[60].dt;
    if (checkpoint.timestamp < lastMinutely) {
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
      //
    }
  }
};

export default forecast;
