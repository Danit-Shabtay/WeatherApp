import store from "./Store";
import { addFavorite, removeFavorite } from "./StoreActions";

export const removeCityFromFavorite = (cityInformation) => {
  return store.dispatch(removeFavorite(cityInformation));
};

export const addCityToFavorite = (cityInformation) => {
  return store.dispatch(addFavorite(cityInformation));
};

/**
 * Check if city exists in the global store favorite array.
 * @param {*} cityInformation
 * @returns
 */
export const isCityInFavorite = (cityInformation) => {
  const storeState = store.getState();
  const storeFavorites = storeState.favorites;

  const filterResult = storeFavorites.filter(
    (favorite) =>
      favorite.label === cityInformation.label &&
      favorite.key === cityInformation.key
  );

  if (filterResult.length > 0) {
    return true;
  } else {
    return false;
  }
};
