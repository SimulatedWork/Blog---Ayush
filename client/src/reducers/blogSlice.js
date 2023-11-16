import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchBlog = createAsyncThunk("blogs/fetchBlog", async () => {
  const response = await axios.get("http://localhost:8000/api/v1/blogs");
  return response.data;
});

const blogSlice = createSlice({
  name: "blog",
  initialState: {
    status: "idle",
    blogs: [],
    error: null,
  },
  reducers: {
    setBlog: (state, action) => {
      state.blogs = action.payload;
      state.error = null;
    },
    postBlog: (state, action) => {
      state.blogs.push(action.payload);
      state.error = null;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBlog.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.blogs = action.payload;
      state.error = null;
    });

    // eslint-disable-next-line no-unused-vars
    builder.addCase(fetchBlog.pending, (state, action) => {
      state.status = "pending...";
    });

    builder.addCase(fetchBlog.rejected, (state, action) => {
      (state.status = "rejected"), (state.error = action.error.message);
    });
  },
});

export const { setBlog, clearUser, setError } = blogSlice.actions;
export default blogSlice.reducer;
