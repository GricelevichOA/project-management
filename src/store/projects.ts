import { createSlice } from "@reduxjs/toolkit";
import { ProjectType, ProjectsState } from "../utils/types";

const initialState = {
  items: [],
  currentProject: null,
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
