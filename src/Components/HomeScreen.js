import * as React from "react";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import SearchTextField from "./SearchTextField";
import ScatteredClouds from "./ScatteredClouds";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

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
      spacing={2}
    >
      {/* First row */}
      <Grid item xs={4}></Grid>
      <Grid item xs={4}>
        <Item>
          <SearchTextField onCityChange={handleCityChanges} />
        </Item>
      </Grid>
      <Grid item xs={4}></Grid>

      {/* Second row */}
      <Grid item xs={12}>
        <ScatteredClouds cityInformation={currentCityInformation} />
      </Grid>
    </Grid>
  );
}
