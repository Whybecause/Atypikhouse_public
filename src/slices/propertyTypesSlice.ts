import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store";

import * as adminService from "../services/admin/admin-service";
export interface IPropertyType {
  id?: number,
  type?: string,
  description?: string,
  image?: any
}

const propertyTypeAdapter = createEntityAdapter<IPropertyType>({
  sortComparer: (a, b) => a.type.localeCompare(b.type)

});

export const fetchPropertyTypes = createAsyncThunk(
  "/propertyType/fetchPropertyTypes",
  async () => {
    return await adminService.default.fetchPropertyTypes();
  }
);
export const createPropertyType = createAsyncThunk(
  "/propertyType/createPropertyType",
  async (initialEquip: IPropertyType) => {
    return await adminService.default.createPropertyType(initialEquip);
  }
);

const propertyTypesSlice = createSlice({
  name: "propertyTypes",
  initialState: propertyTypeAdapter.getInitialState({ status: "idle", error: null }),
  reducers: {
    editPropertyType: propertyTypeAdapter.updateOne,
    removePropertyType: propertyTypeAdapter.removeOne
  },
  extraReducers: builder => {
    builder.addCase(fetchPropertyTypes.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchPropertyTypes.fulfilled, (state, action) => {
      state.status = "success";
      propertyTypeAdapter.setAll(state, action.payload.result);
    });
    builder.addCase(createPropertyType.fulfilled, (state, action) => {
      propertyTypeAdapter.addOne(state, action.payload.result);
    });
  }
});

export default propertyTypesSlice.reducer;

export const { editPropertyType, removePropertyType } = propertyTypesSlice.actions;

export const { selectAll: selectAllPropertyTypes, selectById: selectPropertyTypeById, selectIds: selectPropertyTypeIds } =
  propertyTypeAdapter.getSelectors<RootState>(state => state.propertyTypes);

export const selectPropertyTypesOtherThanCurrent = createSelector(
  [selectAllPropertyTypes, (state, propertyTypeId) => propertyTypeId],
  (propertyTypes, propertyTypeId) => propertyTypes.filter(propertyType => propertyType.id !== propertyTypeId)
);
