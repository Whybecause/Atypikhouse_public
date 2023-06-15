import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";

import { IUser } from "./userSlice";
import type { RootState } from "../store";
import * as AdminService from "../services/admin/admin-service";

const usersAdapter = createEntityAdapter<IUser>({
  sortComparer: (a, b) => a.id.toString().localeCompare(b.id.toString(), undefined, { "numeric": true })
});

export const adminFetchUsers = createAsyncThunk(
  "/admin/users/fetchUsers",
  async () => {
    return await AdminService.default.fetchUsers();
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: usersAdapter.getInitialState({ status: "idle", error: null }),
  reducers: {
    adminUpdateUser: usersAdapter.updateOne,
    adminDeleteUser: usersAdapter.removeOne
  },
  extraReducers: builder => {
    builder.addCase(adminFetchUsers.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(adminFetchUsers.fulfilled, (state, action) => {
      state.status = "succeeded";
      usersAdapter.setAll(state, action.payload.users);
    });
  }
});

export const { adminDeleteUser, adminUpdateUser } = usersSlice.actions;

export default usersSlice.reducer;

export const { selectAll: selectAllUsers, selectById: selectUserById, selectIds: selectUserIds }
  = usersAdapter.getSelectors<RootState>(state => state.users);
