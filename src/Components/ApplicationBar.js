import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AirOutlinedIcon from "@mui/icons-material/AirOutlined";
import { ScreenTypes } from "../Constants/ScreenTypes";
import "./ApplicationBar.css";

export default function ButtonAppBar(props) {
  const onPageClick = props.onPageClick;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar className="application-bar">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="AirOutlined"
            sx={{ mr: 1 }}
          >
            <AirOutlinedIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Weather App
          </Typography>
          <Button color="inherit" onClick={() => onPageClick(ScreenTypes.HOME)}>
            Home
          </Button>
          <Button
            color="inherit"
            onClick={() => onPageClick(ScreenTypes.FAVORITE)}
          >
            Favorites
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
