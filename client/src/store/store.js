// src/store/store.js

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducers/userSlice";
import blogReducer from "../reducers/blogSlice";

// Load state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("reduxState");
    if (serializedState === null) {
      return undefined;
    }
    const data = JSON.parse(serializedState);
    return data;
  } catch (err) {
    return undefined;
  }
};

// Save state to localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("reduxState", serializedState);
  } catch (err) {
    // Handle errors here
  }
};

const rootReducer = combineReducers({
  user: userReducer,
  blog: blogReducer,
});

const store = configureStore({
  reducer: rootReducer,
  preloadedState: loadState(),
});

// Subscribe to store changes and save to localStorage
store.subscribe(() => {
  saveState(store.getState());
});

export default store;
