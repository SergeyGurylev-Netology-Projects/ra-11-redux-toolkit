import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from './store';
import { itemAPI, type Item } from './index'

export interface SearchState {
  query: string
  totalResults: number
  totalPages: number
  currentPage: number
  activeItem: string
  items: Item[];
  status: "idle" | "loading" | "failed"
}

const initialState: SearchState = {
  query: "",
  totalResults: 0,
  totalPages: 0,
  currentPage: 0,
  items: [],
  activeItem: "",
  status: "idle",
}

const fetchSearchItems = createAsyncThunk(
  "search/searchItems",
  async (...args: Parameters<typeof itemAPI.fetchItems>) => {
    const response = await itemAPI.fetchItems(...args);
    return response;
  },
)

const searchSlice = createSlice({
  name: 'search',
  initialState: initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    setActiveItem: (state, action: PayloadAction<string>) => {
      state.activeItem = action.payload
    },
    clearSearchList: (state) => {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchItems.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchSearchItems.fulfilled, (state, action) => {
        state.status = "idle"
        state.items = action.payload.items;
        state.totalResults = action.payload.totalResults;
        state.totalPages = Math.ceil(state.totalResults / 10);
      })
      .addCase(fetchSearchItems.rejected, (state) => {
        state.status = "failed"
      })
  },
})

export const { setQuery, setPage, setActiveItem, clearSearchList } = searchSlice.actions;

export const selectSearchItems = (state: RootState) => {
  return state.search;
}

export const searchItems =
  (search: string, page = 1): AppThunk =>
    (dispatch) => {
      dispatch(setPage(page));

      if (search.length) dispatch(setQuery(search));

      if (page === 0) {
        dispatch(clearSearchList())
      } else {
        dispatch(fetchSearchItems({search: search, page: page}))
      }
  }

export default searchSlice.reducer;
