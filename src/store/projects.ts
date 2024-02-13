import { createSlice } from "@reduxjs/toolkit";
import { ProjectType, ProjectsState, Task } from "../utils/types";

const initialState = {
  items: [],
  currentProject: {
    projectData: null,
    projectOwner: null,
    projectTasks: null,
  },
  isLoading: false,
  error: null,
} as ProjectsState;

export const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setProjects: (state, action) => {
      state.items = action.payload;
    },
    clearProjects: (state) => {
      state.items = [];
    },
    isLoadingStart: (state) => {
      state.isLoading = true;
    },
    isLoadingEnd: (state) => {
      state.isLoading = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setCurrentProject: (state, action) => {
      state.currentProject = action.payload;
    },
    clearCurrentProject: (state) => {
      state.currentProject = null;
    },
  },
});
