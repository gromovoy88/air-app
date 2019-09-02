import axios from 'axios';

const API_DATA = {
  weatherApiUrl: 'https://api.openweathermap.org/data/2.5/',
  weatherApiKey: process.env.API_KEY,
};

/**
 * Receiving Promise after GET request to API, returned promise consists current weather data.
 * @param lat - Latitude
 * @param lon - Longitude
 * @returns {Promise<AxiosResponse<T>>}
 */
const getWeatherByCoordinates = (lat, lon) =>
  axios.get(`${API_DATA.weatherApiUrl}weather?lat=${lat}&lon=${lon}&appid=${API_DATA.weatherApiKey}`);

/**
 * Receiving Promise after GET request to API, returned forecast which divided for 5 days,
 * by 3 hours.
 * @param lat - Latitude
 * @param lon - Longitude
 * @returns {Promise<AxiosResponse<T>>}
 */
const getForecastByCoordinates = (lat, lon) =>
  axios.get(`${API_DATA.weatherApiUrl}forecast?lat=${lat}&lon=${lon}&appid=${API_DATA.weatherApiKey}`);

/**
 * Returned a weather object.
 * @param lat - Latitude
 * @param lon - Longitude
 * @returns { weatherObject }
 */
const getWeather = (lat, lon) => getWeatherByCoordinates(lat, lon)
  .then((weather) => {
    const result = {
      weather: weather.data.weather[0].main,
      city: weather.data.name,
      country: weather.data.sys.country,
      temp: weather.data.main.temp,
      description: weather.data.weather[0].description,
    };
    return result;
  });

/**
 * Returned a forecast object.
 * @param lat - Latitude
 * @param lon - Longitude
 * @returns { forecastObject }
 */
const getForecast = (lat, lon) => getForecastByCoordinates(lat, lon)
  .then((weather) => {
    const result = {
      city: weather.data.city.name,
      country: weather.data.city.country,
      forecast: weather.data.list,
    };
    return result;
  });

export {
  getWeatherByCoordinates,
  getWeather,
  getForecastByCoordinates,
  getForecast,
};
