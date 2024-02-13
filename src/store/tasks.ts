import { createSlice } from "@reduxjs/toolkit";
import {TasksState} from "../utils/types"

const initialState = {
  items: [],
  isLoading: false,
} as TasksState;

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, action) => {
      state.items = action.payload;
    },
    isLoadingStart: (state) => {
      state.isLoading = true;
    },
    isLoadingEnd: (state) => {
      state.isLoading = false;
    },
  },
});
