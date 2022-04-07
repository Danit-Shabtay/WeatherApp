import * as React from "react";
import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { fetchCityInformation } from "../API/ApiRequests";
import { parseCityInformation } from "../API/ApiParsers";
import "./SearchTextField.css";

const DEFAULT_CITY_NAME = "Tel Aviv";

const getCityInformation = async (cityName) => {
  const cityInformationResponse = await fetchCityInformation(cityName);
  const cityInformationList = parseCityInformation(cityInformationResponse);
  return cityInformationList;
};

export default function SearchTextField(props) {
  const [currentCityInformation, setCurrentCityInformation] = useState({
    label: DEFAULT_CITY_NAME,
    key: 0,
  });
  const [cityList, setCityList] = useState([]);

  const onCityChange = props.onCityChange;

  /**
    When the components mounts, we want to fetch the city data.
    We use hard coded default value, because it happens just once.
  */
  useEffect(async () => {
    const cityInformationList = await getCityInformation(DEFAULT_CITY_NAME);
    const firstCityInformation = cityInformationList[0];
    const firstCityInformationKey = firstCityInformation.key;

    setCityList(cityInformationList);
    setCurrentCityInformation(firstCityInformation);
    onCityChange(firstCityInformation);
  }, []);

  /**
    Fired when the user type city name.
    Responssible to update to auto-complete list.
  */
  const handleOnInputChange = async (cityName) => {
    if (cityName == null || cityName === "") {
      return;
    }

    const cityInformationList = await getCityInformation(cityName);
    setCityList(cityInformationList);
  };

  /**
    Fired when the user select city from the auto-complete list.
    Responssible to update the application with the new selected city.
  */
  const handleOnChange = async (selectedCity) => {
    if (selectedCity == null || selectedCity === "") {
      return;
    }

    setCurrentCityInformation(selectedCity);
    onCityChange(selectedCity);
  };

  return (
    <Autocomplete
      disablePortal
      value={currentCityInformation.label}
      options={cityList}
      onChange={(event, value) => handleOnChange(value)}
      onInputChange={(event, value) => handleOnInputChange(value)}
      renderInput={(params) => <TextField {...params} />}
    />
  );
}
