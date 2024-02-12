import { createSlice } from "@reduxjs/toolkit";
import { ProjectsState } from "../utils/types";

const initialState = {
  items: [],
  currentProject: null,
  projectTasks: [],
  projectCreator: null,
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
    setProjectTasks: (state, action) => {
      state.projectTasks = action.payload;
    },
    clearProjectTasks: (state) => {
      state.projectTasks = [];
    },
    setProjectCreator: (state, action) => {
      state.projectCreator = action.payload;
    },
    clearProjectCreator: (state) => {
      state.projectCreator = null;
    },
  },
});
