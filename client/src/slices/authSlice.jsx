import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isRegistered: false, // Add the initial state for isRegistered
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = null;
    },
    setIsRegistered(state, action) {
      // Add the setIsRegistered reducer
      state.isRegistered = action.payload;
    },
  },
});

export const { setUser, clearUser, setIsRegistered } = authSlice.actions; // Export setIsRegistered
export default authSlice.reducer;
