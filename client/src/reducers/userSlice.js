import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: null,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.userInfo = action.payload;
      state.error = null;
    },
    clearUser: (state) => {
      state.userInfo = null;
      state.error = null;
    },
    setError: (state, action) => {
      (state.error = action.payload), (state.userInfo = null);
    },
  },
});

export const { setUser, clearUser, setError } = userSlice.actions;
export default userSlice.reducer;
