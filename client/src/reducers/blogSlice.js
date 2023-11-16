import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchBlog = createAsyncThunk("blogs/fetchBlog", async () => {
  const response = await axios.get("http://localhost:8000/api/v1/blogs");
  return response.data;
});

export const postBlog = createAsyncThunk(
  "blogs/postBlog",
  async (blogData, { getState }) => {
    const token = getState().user.userInfo.token;
    const response = await axios.post(
      "http://localhost:8000/api/v1/blogs/post",
      blogData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  }
);

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

    builder.addCase(postBlog.fulfilled, (state, action) => {
      (state.status = "fulfilled"),
        state.blogs.push(action.payload),
        (state.error = null);
    });

    builder.addCase(postBlog.rejected, (state, action) => {
      (state.status = "rejected"), (state.error = action.error.message);
    });

    // eslint-disable-next-line no-unused-vars
    builder.addCase(postBlog.pending, (state, action) => {
      state.status = "pending...";
    });
  },
});

export const { setBlog, setError } = blogSlice.actions;
export default blogSlice.reducer;
