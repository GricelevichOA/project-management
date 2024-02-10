import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { usersSlice } from "./users";
import { projectsSlice } from "./projects";

export const store = configureStore({
  reducer: combineReducers({
    users: usersSlice.reducer,
    projects: projectsSlice.reducer,
  }),
});

export const actions = {
  users: usersSlice.actions,
  projects: projectsSlice.actions,
};
