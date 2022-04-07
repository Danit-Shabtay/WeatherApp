import * as React from "react";
import { useState } from "react";
import ApplicationBar from "./Components/ApplicationBar";
import HomeScreen from "./Components/HomeScreen";
import FavoriteScreen from "./Components/FavoriteScreen";
import { ScreenTypes } from "./Constants/ScreenTypes";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import "./App.css";

function App() {
  const [currentPageName, setCurrentPageName] = useState(ScreenTypes.HOME);

  const theme = useTheme();
  const largeScreen = useMediaQuery(theme.breakpoints.up("md"));

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
    <div className={"image" + (largeScreen ? " full-screen" : "")}>
      <React.Fragment>
        <ApplicationBar onPageClick={onPageClick}></ApplicationBar>
        {currentScreen()}
      </React.Fragment>
    </div>
  );
}

export default App;
