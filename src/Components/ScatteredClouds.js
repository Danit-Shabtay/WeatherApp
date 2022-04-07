import * as React from "react";
import { useState, useEffect } from "react";
import { fetchDailyForecasts } from "../API/ApiRequests";
import { parseForecastResponse } from "../API/ApiParsers";
import Grid from "@mui/material/Grid";
import WeatherCard from "./WeatherCard";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import store from "../State/Store";
import "./ScatteredClouds.css";
import {
  addCityToFavorite,
  removeCityFromFavorite,
  isCityInFavorite,
} from "../State/CityActions";

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

export default function ScatteredClouds(props) {
  const [weatherForecastList, setWeatherForecastList] = useState([]);
  const [isCityFavorite, setIsCityFavorite] = useState(false);
  const [cityInformation, setCityInformation] = useState({});
  const weatherCardsList = createWeatherCardsList(weatherForecastList);

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
    <Grid container direction="row" spacing={1}>
      {/* First row */}
      <Grid container item xs={3} direction="left">
        <div className="city-name">Tel Aviv</div>
      </Grid>
      <Grid container item xs={6}></Grid>
      <Grid container item xs={3} direction="right">
        <Button onClick={() => addRemoveCityFromFavorite(cityInformation)}>
          {getFavoriteButtonText(cityInformation)}
          <IconButton>{getFavoriteIcon()}</IconButton>
        </Button>
      </Grid>

      <Grid container item xs={2}></Grid>

      {/* Second row */}
      <Grid item xs={16}>
        <div className="scattered-clouds">Scattered Clouds</div>
      </Grid>

      <Grid container item xs={2}></Grid>
      <Grid container item xs={2}></Grid>

      {/* Third row */}
      <Grid container item xs={16} direction="row" alignItems="center">
        {weatherCardsList}
      </Grid>
      <Grid container item xs={2}></Grid>
    </Grid>
  );
}
