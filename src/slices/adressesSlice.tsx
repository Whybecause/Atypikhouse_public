import { createSlice, createAsyncThunk, createEntityAdapter, PayloadAction, createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store";

import * as adressService from "../services/adress/adress.service";

export interface IAdress {
  id?: number,
  street?: string,
  ZIPCode?: number,
  city?: string,
  country?: string,
}

const adressesAdapter = createEntityAdapter<IAdress>();

export const fetchAdresses = createAsyncThunk(
  "/adresses/fetchAdresses",
  async () => {
    return await adressService.default.fetchAdresses();
  });

export const addNewAdress = createAsyncThunk(
  "/adresses/addNewAdress",
  async (initialAdress: IAdress) => {
    return await adressService.default.addAdress(initialAdress);
  }
);

const adressesSlice = createSlice({
  name: "adresses",
  initialState: adressesAdapter.getInitialState({ status: "idle", error: null }),
  reducers: {
    adressAddOne: adressesAdapter.addOne,
    updateAdress(state, action) {
      adressesAdapter.upsertOne(state, action.payload);
    },
    deleteAdress: adressesAdapter.removeOne
  },
  extraReducers: builder => {
    builder.addCase(fetchAdresses.fulfilled, (state, action) => {
      adressesAdapter.setAll(state, action.payload.adresses);
    });
    builder.addCase(addNewAdress.fulfilled, (state, action) => {
      adressesAdapter.addOne(state, action.payload.adress);
    });
  }
});

export const { adressAddOne, updateAdress, deleteAdress } = adressesSlice.actions;

export default adressesSlice.reducer;

export const { selectAll: selectAllAdresses, selectById: selectAdressById, selectIds: selectAdressesIds } =
  adressesAdapter.getSelectors<RootState>(state => state.adresses);

export const selectAdressesOtherThanMain = createSelector(
  [selectAllAdresses, (state, adressId) => adressId],
  (adresses, adressId) => adresses.filter(adress => adress.id !== adressId)
);
