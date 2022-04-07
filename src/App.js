import * as React from "react";
import { useState } from "react";
import "./App.css";
import ApplicationBar from "./Components/ApplicationBar";
import HomeScreen from "./Components/HomeScreen";
import FavoriteScreen from "./Components/FavoriteScreen";
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
import { ScreenTypes } from "./Constants/ScreenTypes";

function App() {
  const [currentPageName, setCurrentPageName] = useState(ScreenTypes.HOME);

  const onPageClick = (pageName) => {
    setCurrentPageName(pageName);
    console.log(currentPageName);
  };

  const currentScreen = () => {
    if (currentPageName === ScreenTypes.HOME) {
      return <HomeScreen></HomeScreen>;
    } else if (currentPageName === ScreenTypes.FAVORITE) {
      return <FavoriteScreen></FavoriteScreen>;
    } else {
      return <div></div>;
    }
  };

  return (
    <div className="App">
      <React.Fragment>
        <ApplicationBar onPageClick={onPageClick}></ApplicationBar>
        {currentScreen()}
      </React.Fragment>
    </div>
  );
}

export default App;
