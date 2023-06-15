import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import type { RootState } from "../store";

import * as adminService from "../services/admin/admin-service";

export interface IEquip {
  id?: number,
  label?: string,
  image?: any
}

interface ILabel {
  label: string
}
export interface ICreateEquip {
  data: ILabel,
  image: string[]
}

const equipementsAdapter = createEntityAdapter<IEquip>();

export const fetchEquips = createAsyncThunk(
  "/equipements/fetchEquipements",
  async () => {
    return await adminService.default.fetchEquips();
  }
);
export const createEquipType = createAsyncThunk(
  "/equipements/createEquipType",
  async (initialEquip: ICreateEquip) => {
    return await adminService.default.createEquipType(initialEquip);
  }
);

const equipementsSlice = createSlice({
  name: "equipements",
  initialState: equipementsAdapter.getInitialState({ status: "idle", error: null }),
  reducers: {
    editEquipement: equipementsAdapter.updateOne,
    removeEquipement: equipementsAdapter.removeOne
  },
  extraReducers: builder => {
    builder.addCase(fetchEquips.fulfilled, (state, action) => {
      equipementsAdapter.setAll(state, action.payload.result);
    });
    builder.addCase(createEquipType.fulfilled, (state, action) => {
      equipementsAdapter.addOne(state, action.payload.result);
    });
  }
});

export default equipementsSlice.reducer;

export const { editEquipement, removeEquipement } = equipementsSlice.actions;

export const { selectAll: selectAllEquipements, selectById: selectEquipementsById, selectIds: selectEquipementsIds } =
  equipementsAdapter.getSelectors<RootState>(state => state.equipements);