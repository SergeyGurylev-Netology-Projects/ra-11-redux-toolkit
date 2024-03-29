import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { type Favourite } from './index'

export interface FavouriteState {
  favourites: Favourite[]
  activeFavouriteItem: string
}

const initialState: FavouriteState = {
  favourites: [],
  activeFavouriteItem: ""
}

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState: initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Favourite>) => {
      const index = state.favourites.findIndex(el=> el.imdbID === action.payload.imdbID);
      if (index < 0) {
        state.favourites.push(
          {
            imdbID: action.payload.imdbID,
            detail: action.payload.detail}
        );
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.favourites = state.favourites.filter(el => el.imdbID !== action.payload);
    },
    setActiveItem: (state, action: PayloadAction<string>) => {
      state.activeFavouriteItem = action.payload
    },
  },
})

export const { addItem, removeItem, setActiveItem } = favouritesSlice.actions;

export const selectFavourites = (state: RootState) => {
  return state.favourites;
}

export default favouritesSlice.reducer;
