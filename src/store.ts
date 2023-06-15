import { configureStore } from "@reduxjs/toolkit";
import errorsReducer from "./slices/error-successSlice";
import adressesReducer from "./slices/adressesSlice";
import userReducer from "./slices/userSlice";
import usersReducer from "./slices/adminUsersSlice";
import messagesReducer from "./slices/messagesSlice";
import propertieseReducer from "./slices/propertiesSlice";
import equipementsReducer from "./slices/equipementsSlice";
import propertyTypesReducer from "./slices/propertyTypesSlice";

export const store = configureStore({
  reducer: {
    errors: errorsReducer,
    user: userReducer,
    users: usersReducer,
    adresses: adressesReducer,
    messages: messagesReducer,
    properties: propertieseReducer?.properties,
    historical: propertieseReducer?.historical,
    equipements: equipementsReducer,
    propertyTypes: propertyTypesReducer
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
