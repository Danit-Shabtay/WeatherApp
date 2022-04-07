// Only use for testings:
import {
  DummyForecastData,
  DummyAutoCompleteData,
  DummyCurrentWeather,
} from "./DummyData";

const API_KEY = "?apikey=vJp9m3kXAkV2ge2mGzgOrX3AdC86iGaA";
const FORECAST_API_URL =
  "http://dataservice.accuweather.com/forecasts/v1/daily/5day/";
const AUTOCOMPLETE_API_URL =
  "http://dataservice.accuweather.com/locations/v1/cities/autocomplete";
const CURRENT_WEATHER_URL =
  "http://dataservice.accuweather.com/currentconditions/v1/";

/**
 * Request 5 day forecast from the server.
 * @param {String} locationId
 * @returns API response
 */
export const fetchDailyForecasts = (locationId) => {
  const apiUrl = FORECAST_API_URL + locationId + API_KEY;

  /*
  if (locationId == 20000) {
    return Promise.resolve(DummyForecastData[1]);
  } else {
    return Promise.resolve(DummyForecastData[0]);
  }
  */
  return fetch(apiUrl).then((response) => response.json());
};

/**
 * Request location information based on partial city name.
 * @param {String} locationInfo
 * @returns API response
 */
export const fetchCityInformation = (cityName) => {
  const cityNameWithoutSpace = cityName.replace(" ", "%20");
  const apiUrl = AUTOCOMPLETE_API_URL + API_KEY + "&q=" + cityNameWithoutSpace;

  //return Promise.resolve(DummyAutoCompleteData);
  return fetch(apiUrl).then((response) => response.json());
};

/**
 *
 * @param {*} locationId
 * @returns API response
 */
export const fetchCurrentWeather = (locationId) => {
  const apiUrl = CURRENT_WEATHER_URL + locationId + API_KEY;

  /*
  if (locationId == 20000) {
    return Promise.resolve([DummyCurrentWeather[0]]);
  } else {
    return Promise.resolve([DummyCurrentWeather[1]]);
  }
  */

  return fetch(apiUrl).then((response) => response.json());
};
