const DAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const datetimeToDayName = (datetimeString) => {
  const date = new Date(datetimeString);
  const dateIndex = date.getDay();
  return DAY_NAMES[dateIndex];
};

const fahrenheitToCelsius = (fahrenheit) => {
  const celsius = ((fahrenheit - 32) * 5) / 9;
  return celsius;
};

export const parseForecastResponse = (forecastResponse) => {
  const dailyForecasts = forecastResponse.DailyForecasts;

  let forecastList = [];

  dailyForecasts.map((forecast) => {
    const day = datetimeToDayName(forecast.Date);
    const temperature = Math.round(
      fahrenheitToCelsius(forecast.Temperature.Maximum.Value)
    );

    forecastList.push({
      day,
      temperature,
    });
  });

  return forecastList;
};

export const parseCityInformation = (cityInformationResponse) => {
  let cityInformationList = [];

  cityInformationResponse.map((cityInfo) => {
    cityInformationList.push({
      label: cityInfo.LocalizedName,
      key: cityInfo.Key,
    });
  });

  return cityInformationList;
};

export const parseCurrentWeather = (currentWeatherResponse) => {
  let currentWeatherInformation = currentWeatherResponse[0];

  return {
    weatherText: currentWeatherInformation.WeatherText,
    temperature: Math.round(currentWeatherInformation.Temperature.Metric.Value),
  };
};
