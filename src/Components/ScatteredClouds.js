import * as React from "react";
import { useState, useEffect } from "react";
import { fetchDailyForecasts, fetchCurrentWeather } from "../API/ApiRequests";
import { parseForecastResponse, parseCurrentWeather } from "../API/ApiParsers";
import Grid from "@mui/material/Grid";
import WeatherCard from "./WeatherCard";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import Button from "@mui/material/Button";
import store from "../State/Store";
import "./ScatteredClouds.css";
import {
  addCityToFavorite,
  removeCityFromFavorite,
  isCityInFavorite,
} from "../State/CityActions";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

/**
 * Retreive weather data from the API and format it.
 * @param {String} cityId
 * @returns Collection of formated weather data.
 */
const getWeatherForecastData = async (cityId) => {
  const weatherForecastResponse = await fetchDailyForecasts(cityId);
  let weatherForecast = parseForecastResponse(weatherForecastResponse);

  for (let i = 0; i < weatherForecast.length; i++) {
    weatherForecast[i].day = weatherForecast[i].day.slice(0, 3);
    weatherForecast[i].temperature = weatherForecast[i].temperature + "°c";
  }

  return weatherForecast;
};

/**
 * If there is weather data to show return collection
 * of weather cards with the corresponding data.
 * Otherwise return empty HTML elememt.
 * @param {list} weatherForecastData
 * @returns HTML element
 */
const createWeatherCardsList = (weatherForecastData) => {
  if (weatherForecastData == null || weatherForecastData.length == 0) {
    return <div></div>;
  }

  let index = 0;

  return (
    <React.Fragment>
      {weatherForecastData.map((data) => {
        return (
          <WeatherCard
            key={index++}
            title={data.day}
            temperature={data.temperature}
          />
        );
      })}
    </React.Fragment>
  );
};

const getCurrentWeatherForCity = async (cityId) => {
  const cityCurrentWeatherResponse = await fetchCurrentWeather(cityId);
  const cityCurrentWeather = parseCurrentWeather(cityCurrentWeatherResponse);
  return cityCurrentWeather;
};

export default function ScatteredClouds(props) {
  const [weatherForecastList, setWeatherForecastList] = useState([]);
  const [isCityFavorite, setIsCityFavorite] = useState(false);
  const [cityInformation, setCityInformation] = useState({});
  const [currentCityWeather, setCurrentCityWeather] = useState({});
  const weatherCardsList = createWeatherCardsList(weatherForecastList);

  const theme = useTheme();
  const largeScreen = useMediaQuery(theme.breakpoints.up("md"));

  /**
    Called whenever the city information gets changed.
    Risponssible to update component state.
  */
  useEffect(async () => {
    const cityInformation = props.cityInformation;
    const cityId = cityInformation.key;

    if (cityId == null || cityId == "") {
      return;
    }

    setCityInformation(cityInformation);

    const isCityInFavorites = isCityInFavorite(cityInformation);
    setIsCityFavorite(isCityInFavorites);

    const weatherForecastData = await getWeatherForecastData(cityId);
    setWeatherForecastList(weatherForecastData);

    const currentCityWeather = await getCurrentWeatherForCity(cityId);
    setCurrentCityWeather(currentCityWeather);
  }, [props.cityInformation]);

  /**
   * Add or remove city to/from the global store.
   * @param {object} cityInformation
   */
  const addRemoveCityFromFavorite = (cityInformation) => {
    if (isCityInFavorite(cityInformation)) {
      removeCityFromFavorite(cityInformation);
      setIsCityFavorite(false);
    } else {
      addCityToFavorite(cityInformation);
      setIsCityFavorite(true);
    }

    console.log(`Store: ${JSON.stringify(store.getState().favorites)}`);
  };

  const getFavoriteButtonText = () => {
    if (isCityFavorite) {
      return "Remove from favorites";
    } else {
      return "Add to favorites";
    }
  };

  const getFavoriteIcon = () => {
    if (isCityFavorite) {
      return <FavoriteIcon />;
    } else {
      return <FavoriteBorderOutlinedIcon />;
    }
  };

  return (
    <Grid container direction={largeScreen ? "row" : "column"} spacing={1}>
      {/* First row */}
      <Grid
        container
        direction="row"
        justifyContent={largeScreen ? "space-between" : "center"}
        alignItems="center"
        className="first-grid-row"
      >
        <Grid item>
          <div className="city-name">{cityInformation.label}</div>
          <div className="city-weather">
            {currentCityWeather.temperature + "°c"}
          </div>
        </Grid>

        <Grid item>
          <Button
            color="inherit"
            className="btn-favorite"
            onClick={() => addRemoveCityFromFavorite(cityInformation)}
          >
            {getFavoriteButtonText(cityInformation)}
            {getFavoriteIcon()}
          </Button>
        </Grid>
      </Grid>

      {/* Second row */}
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <div className="scattered-clouds">Scattered Clouds</div>
      </Grid>

      {/* Third row */}
      <Grid
        container
        item
        direction={largeScreen ? "row" : "column"}
        justifyContent="space-between"
        alignItems="center"
      >
        {weatherCardsList}
      </Grid>
    </Grid>
  );
}
