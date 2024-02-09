import { createSlice } from "@reduxjs/toolkit";

type UserProfile = {
  uid: string;
  email: string;
  username: string;
  avatar_url: string;
};

type UsersState = {
  currentUser: UserProfile | null;
};

const initialState = { currentUser: null } as UsersState;

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
  },
});
