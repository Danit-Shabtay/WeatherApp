import * as React from "react";
import "./App.css";
import ApplicationBar from "./Components/ApplicationBar";
import HomeScreen from "./Components/HomeScreen";
import {
  fetchDailyForecasts,
  fetchCityInformation,
  fetchCurrentWeather,
} from "./API/ApiRequests";
import {
  parseForecastResponse,
  parseCityInformation,
  parseCurrentWeather,
} from "./API/ApiParsers";

import store from "./State/Store";
import { addFavorite, removeFavorite } from "./State/StoreActions";

function App() {
  // TODO: Remove from here after Redux integration:
  /*
  const locationId = "215854";
  fetchDailyForecasts(locationId).then((response) => {
    const parsed = parseForecastResponse(response);
    console.log(parsed);
  });

  const cityName = "tel aviv";
  fetchCityInformation(cityName).then((response) => {
    const cityInfo = parseCityInformation(response);
    console.log(cityInfo);
  });

  fetchCurrentWeather(locationId).then((response) => {
    const weatherInfo = parseCurrentWeather(response);
    console.log(weatherInfo);
  });
  */

  // TODO: Remove from here:
  /*
  console.log(store.getState());
  const weather = { name: "Tel Aviv", weatherText: "Cludy", tempature: 35 };
  store.dispatch(addFavorite(weather));
  console.log(store.getState());
  store.dispatch(removeFavorite(weather));
  console.log(store.getState());
  */

  return (
    <div className="App">
      <React.Fragment>
        <ApplicationBar></ApplicationBar>
        <HomeScreen></HomeScreen>
      </React.Fragment>
    </div>
  );
}

export default App;
