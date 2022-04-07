import store from "./Store";

export const getAllFavorites = () => {
  const storeState = store.getState();
  return storeState.favorites;
};
