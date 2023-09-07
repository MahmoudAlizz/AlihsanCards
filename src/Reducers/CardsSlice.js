import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import cardApi from "../Api/cards";
import _ from "lodash";
const initialState = {
  loading: false,
  errorMessage: "",
  data: {},
  dataSearch: {},
  isSearch: false,
};
export const FetchCards = createAsyncThunk("cards/FetchCards", async () => {
  const res = await cardApi.get("");
  return res.data;
});
export const AddCard = createAsyncThunk("cards/AddCard", async (payload) => {
  const res = await cardApi.post('', payload.data)
  return res.data
})
export const EditCard = createAsyncThunk(
  "cards/EditCard",
  async (payload) => {
    const res = await cardApi.put(`/${payload.id}`, payload.data)
    return res.data
  }
);
export const DeleteCard = createAsyncThunk(
  "cards/DeleteCard",
  async (id) => {
    const res = await cardApi.delete(`/${id}`);
    return id;
  }
);
const CardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    search: (state, { payload }) => {
      if (Object.values(payload.data).length !== 0) {
        state.dataSearch = payload.data;
        state.isSearch = true
      }
      else {
        state.dataSearch = payload.data;
        if (Object.values(payload.data) == 0 && payload.searchText == 0) {
          state.isSearch = false
        }
        if (Object.values(payload.data) == 0 && payload.searchText != 0) {
          state.isSearch = true
        }
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(FetchCards.fulfilled, (state, { payload }) => {
      state.data = _.mapKeys(payload, "id");
      state.loading = false
    });
    builder.addCase(FetchCards.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(FetchCards.rejected, (state) => {
      state.errorMessage = "error";
      state.loading = false;
    });
    builder.addCase(AddCard.fulfilled, (state, { payload }) => {
      state.data = { ...state.data, [payload.id]: payload }
      state.loading = false
    });
    builder.addCase(AddCard.pending, (state) => {
      state.loading = true
    });
    builder.addCase(AddCard.rejected, (state, { payload }) => {
      state.loading = false;
      state.errorMessage = "error"
    });
    builder.addCase(EditCard.fulfilled, (state, { payload }) => {
      state.data = { ...state.data, [payload.id]: payload }
      state.loading = false
    });
    builder.addCase(EditCard.pending, (state) => {
      state.loading = true
    });
    builder.addCase(EditCard.rejected, (state, { payload }) => {
      state.loading = false;
      state.errorMessage = "error"
    });
    builder.addCase(DeleteCard.fulfilled, (state, { payload }) => {
      state.data = _.omit(state.data, payload);
      state.dataSearch = _.omit(state.dataSearch, payload);
      state.loading = false
    });
    builder.addCase(DeleteCard.pending, (state) => {
      state.loading = true
    });
    builder.addCase(DeleteCard.rejected, (state, { payload }) => {
      state.loading = false;
      state.errorMessage = "error"
    });
  },
});

export const { search } = CardsSlice.actions;

export default CardsSlice.reducer;
