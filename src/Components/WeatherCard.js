import * as React from "react";
import { Box } from "@mui/system";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import "./WeatherCard.css";

const showDescription = (description) => {
  if (description == null) {
    return <div></div>;
  } else {
    return <p>{description}</p>;
  }
};

export default function WeatherCard(props) {
  const theme = useTheme();
  const largeScreen = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Box
      className={
        "weather-card" +
        (largeScreen ? " full-screen-card" : " phone-screen-card")
      }
      sx={{ p: 2, border: 1 }}
    >
      <div>{props.title}</div>
      <div>{props.temperature}</div>
      {showDescription(props.description)}
    </Box>
  );
}
