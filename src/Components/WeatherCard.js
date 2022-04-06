import * as React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/system";
import Button from "@mui/material/Button";

const Item = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  margin: theme.spacing(1),
}));

export default function WeatherCard(props) {
  return (
    <Box component="span" sx={{ p: 2, border: 1, borderColor: "text.primary" }}>
      <Item>{props.day}</Item>
      <Item>{props.temperature}</Item>
    </Box>
  );
}
