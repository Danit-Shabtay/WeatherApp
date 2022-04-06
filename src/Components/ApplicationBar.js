import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AirOutlinedIcon from "@mui/icons-material/AirOutlined";

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="AirOutlined"
            sx={{ mr: 1 }}
          >
            <AirOutlinedIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Weather App
          </Typography>
          <Button color="inherit">Home</Button>
          <Button color="inherit">Favorites</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
