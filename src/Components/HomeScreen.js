import * as React from "react";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import SearchTextField from "./SearchTextField";
import ScatteredClouds from "./ScatteredClouds";
import "./SearchTextField";
import "./HomeScreen.css";

export default function HomeScreen() {
  const [currentCityInformation, setCurrentCityInformation] = useState({});

  const handleCityChanges = (newCityInformation) => {
    setCurrentCityInformation(newCityInformation);
  };

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={1}
    >
      {/* First row */}
      <Grid item xs={2}></Grid>
      <Grid item xs={2}>
        <div className="search-text-field">
          <SearchTextField onCityChange={handleCityChanges} />
        </div>
      </Grid>
      <Grid item xs={2}></Grid>

      {/* Second row */}
      <Grid className="city-information" item xs={8}>
        <ScatteredClouds cityInformation={currentCityInformation} />
      </Grid>
    </Grid>
  );
}
