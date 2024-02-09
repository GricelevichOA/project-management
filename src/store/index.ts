import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { usersSlice } from "./users";

export const store = configureStore({
  reducer: combineReducers({
    users: usersSlice.reducer,
  }),
});

export const actions = {
  users: usersSlice.actions,
};
