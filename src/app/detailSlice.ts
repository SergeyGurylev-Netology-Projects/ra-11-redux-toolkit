import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from './store';
import { itemAPI, type Detail } from './index';

export interface DetailState {
  query: string
  activeID: string
  detail: Detail
  status: "idle" | "loading" | "failed"
  source: "search" | "favourites"
}

const initialState: DetailState = {
  query: "",
  activeID: "",
  detail: {
    imdbID: "",
    Title: "",
    Type: "",
    Poster: "",
    Year: "",
    Genre: "",
    Runtime: "",
    Director: "",
    Actors: "",
    imdbRating: "",
  },
  status: "idle",
  source: "search"
}

const fetchDetail = createAsyncThunk(
  "detail/detailItem",
  async (...args: Parameters<typeof itemAPI.fetchDetail>) => {
    const response = await itemAPI.fetchDetail(...args);
    return response;
  },
)

const detailSlice = createSlice({
  name: 'detail',
  initialState: initialState,
  reducers: {
    setSource: (state, action: PayloadAction<{ activeID: string, source: typeof initialState.source }>) => {
      state.activeID = action.payload.activeID;
      state.source = action.payload.source;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDetail.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchDetail.fulfilled, (state, action) => {
        state.status = "idle"
        state.detail = {...action.payload.detail};
      })
      .addCase(fetchDetail.rejected, (state) => {
        state.status = "failed"
      })
  },
})

export const { setSource } = detailSlice.actions;

export const selectItemDetails = (state: RootState) => {
  return state.detail;
}

export const detailItem =
  (id: string): AppThunk =>
    (dispatch) => {
      dispatch(fetchDetail({id: id}))
    }

export default detailSlice.reducer;
