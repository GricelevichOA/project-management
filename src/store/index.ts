import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { usersSlice } from "./users";
import { projectsSlice } from "./projects";
import { tasksSlice } from "./tasks";

export const store = configureStore({
  reducer: combineReducers({
    users: usersSlice.reducer,
    projects: projectsSlice.reducer,
    tasks: tasksSlice.reducer,
  }),
});

export const actions = {
  users: usersSlice.actions,
  projects: projectsSlice.actions,
  tasks: tasksSlice.actions,
};
