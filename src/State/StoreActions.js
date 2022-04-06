import * as StoreTypes from "./StoreTypes";
import store from "./Store";

export const addFavorite = (favorite) => {
  return {
    type: StoreTypes.ADD_FAVORITE,
    payload: favorite,
  };
};

export const removeFavorite = (favorite) => {
  return {
    type: StoreTypes.REMOVE_FAVORITE,
    payload: favorite,
  };
};
