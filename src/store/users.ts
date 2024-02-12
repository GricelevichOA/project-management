import { createSlice } from "@reduxjs/toolkit";
import { UserProfile, UsersState } from "../utils/types";

const initialState = {
  currentUser: null,
  allUsers: [],
  isLoading: false,
} as UsersState;

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    clearUserData: (state) => {
      state.currentUser = null;
    },
    setUsers: (state, action) => {
      state.allUsers = action.payload;
    },
    isLoadingStart: (state) => {
      state.isLoading = true;
    },
    isLoadingEnd: (state) => {
      state.isLoading = false;
    },
  },
});
