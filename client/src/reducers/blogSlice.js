import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_SERVER_SCHEME = import.meta.env.VITE_SERVER_SCHEME;
const API_SERVER_DOMAIN = import.meta.env.VITE_SERVER_DOMAIN;
const API_SERVER = API_SERVER_SCHEME + "://" + API_SERVER_DOMAIN;

export const fetchBlog = createAsyncThunk("blogs/fetchBlog", async () => {
  const response = await axios.get(`${API_SERVER}/api/v1/blogs`);
  return response.data;
});

export const postBlog = createAsyncThunk(
  "blogs/postBlog",
  async (blogData, { getState }) => {
    console.log(blogData);
    const token = getState().user.userInfo.token;
    const response = await axios.post(
      `${API_SERVER}/api/v1/blogs/post`,
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

export const likeBlog = createAsyncThunk(
  "blogs/likeBlog",
  async (blogId, { getState }) => {
    const token = getState().user.userInfo.token;
    const userId = getState().user.userInfo._id;
    const response = await axios.post(
      `${API_SERVER}/api/v1/blogs/like/${blogId}/${userId}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

export const deleteBlog = createAsyncThunk(
  "blogs/delete",
  async (blogId, { getState }) => {
    const token = getState().user.userInfo.token;
    const response = await axios.delete(
      `${API_SERVER}/api/v1/blogs/delete/${blogId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
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

    builder.addCase(fetchBlog.pending, (state) => {
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

    builder.addCase(postBlog.pending, (state) => {
      state.status = "pending...";
    });

    builder.addCase(likeBlog.pending, (state) => {
      state.status = "pending...";
    });

    builder.addCase(likeBlog.fulfilled, (state, action) => {
      const updatedBlog = state.blogs.filter(
        (blog) => blog._id !== action.payload._id
      );
      state.blogs = [...updatedBlog, action.payload];
      state.error = null;
    });

    builder.addCase(likeBlog.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.error.message;
    });

    builder.addCase(deleteBlog.pending, (state) => {
      state.status = "Pending...";
    });

    builder.addCase(deleteBlog.fulfilled, (state, action) => {
      state.blogs = state.blogs.filter((b) => b._id !== action.payload._id);
      state.status = "fulfilled";
    });

    builder.addCase(deleteBlog.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.error.message;
    });
  },
});

export const { setBlog, setError } = blogSlice.actions;
export default blogSlice.reducer;
