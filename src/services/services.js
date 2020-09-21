import {months, days} from '../utils/staticJSON';
import {currentDateToString, timeToString} from '../utils/utils';

export const getCurrentLocation = () => {
  return new Promise( (resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      position => { resolve({position, error: false})},
      err => { reject({err, error: true})}
    );
  }).catch(err => err);
}

export const getWeatherAndForecast = (param1 , param2 , byCoords) => {
  const APIkey = process.env.REACT_APP_WEATHER_API_KEY;
  let query = byCoords ? `lat=${param1}&lon=${param2}` : `q=${param1},${param2}`
  const weather = `https://api.openweathermap.org/data/2.5/weather?${query}&APPID=${APIkey}&units=metric`;
  const forecast = `https://api.openweathermap.org/data/2.5/forecast?${query}&APPID=${APIkey}&units=metric`;

  return Promise.all([fetch(weather), fetch(forecast)])
    .then(([res1, res2]) => {
      if (res1.ok && res2.ok) {
        return Promise.all([res1.json(), res2.json()]);
      }
    })
    .then(([{name, sys, weather, main, clouds, wind}, {list}]) => {
      const weatherInfo = {
        id: sys.id,
        city: name,
        country: sys.country,
        date: currentDateToString(days, months),
        description: weather[0].description,
        icon: weather[0].icon,
        main: weather[0].main,
        temp: main.temp,
        highestTemp: main.temp_max,
        lowestTemp: main.temp_min,
        sunrise: timeToString(sys.sunrise),
        sunset: timeToString(sys.sunset),
        clouds: clouds.all,
        humidity: main.humidity,
        wind: wind.speed,
        forecast: list,
      };
      return {
        weatherInfo,
        error: false
      }
    })
    .catch(error => {
      console.log(error);
      return {
        weatherInfo: null,
        error: true
      }
    });
}

export const setLocStorage = (name, arr) => {
  try {
    window.localStorage.setItem(name, JSON.stringify(arr));
  } catch (e) {
    console.log(e);
  }
};

export const getLocStorage = (name) => {
  try {
    return JSON.parse(window.localStorage.getItem(name));
  } catch (e) {
    console.log(e);
    return null;
  }
};

