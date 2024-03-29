import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import searchReducer from './searchSlice';
import detailReducer from './detailSlice';
import favouritesReducer from './favourutesSlice';

export const store = configureStore({
  reducer: {
    search: searchReducer,
    detail: detailReducer,
    favourites: favouritesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
