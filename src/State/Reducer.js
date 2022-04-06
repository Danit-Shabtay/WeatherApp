import * as StoreTypes from "./StoreTypes";

const initialState = {
  //currentPage: StoreTypes.HOME_PAGE,
  favorites: [],
};

const isFavoriteEqual = (favorite1, favorite2) => {
  return favorite1.label === favorite2.label && favorite1.key === favorite2.key;
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case StoreTypes.ADD_FAVORITE: {
      return {
        ...state,
        favorites: [...state.favorites, action.payload],
      };
    }

    case StoreTypes.REMOVE_FAVORITE: {
      return {
        favorites: [
          ...state.favorites.filter(
            (favorite) => !isFavoriteEqual(favorite, action.payload)
          ),
        ],
      };
    }

    case StoreTypes.GET_ALL_FAVORITE: {
      return {
        ...state,
        favorites: action.payload.wishlistData,
      };
    }

    default: {
      return state;
    }
  }
}
