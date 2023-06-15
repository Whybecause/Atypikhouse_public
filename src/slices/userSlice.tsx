import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import * as userService from "../services/user/user.service";
export interface IUser {
  id?: number,
  name?: string,
  email?: string,
  image?: any,
  customImage: any,
  role?: string,
  mainAdressId?: number
}
export interface IUpdateUser {
  data?: {
    name?: string,
    email?: string,
    mainAdressId?: number,
    role?: string,
    image?: undefined
  };
  image?: string[]
}

const initialState = {
  value: {},
  status: "idle",
  error: null
};

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  return await userService.default.fetchCurrentUser();
});


const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    updateUser(state, action) {
      const { data, image } = action.payload;

      if (image) {
        state.value = {
          ...state.value,
          customImage: {
            uri: image?.[0]
          },
        };
      }

      state.value = {
        ...state.value,
        ...data
      };
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchUser.pending, (state, action: PayloadAction<IUser>) => {
      state.status = "loading";
    });
    builder.addCase(fetchUser.fulfilled, (state, action: PayloadAction<IUser>) => {
      state.status = "succeeded";
      state.value = action.payload["user"];
    });
  }
});

export default userSlice.reducer;

export const { updateUser } = userSlice.actions;

export const selectUser = (state) => state.user.value;

