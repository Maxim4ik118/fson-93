import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { requestPostDetailsById, requestPosts } from 'services/api';
import { STATUSES } from 'utils/constants';

export const apiGetPosts = createAsyncThunk(
  'posts/apiGetPosts',
  async (_, thunkApi) => {
    try {
      const posts = await requestPosts();
      toast('Your posts were successfully fetched!');
      return posts; // Action Payload
    } catch (error) {
      toast.error(`Oops, some error occured... ${error.message}`);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const apiGetPostDetails = createAsyncThunk(
  'posts/apiGetPostDetails',
  async (postId, thunkApi) => {
    try {
      const post = await requestPostDetailsById(postId);

      return post; // Action Payload
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  posts: null,
  postDetails: null,
  status: STATUSES.idle, // "idle" | "pending" | "success" | "error"
  error: null,
  page: 1,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    incrementPage: state => {
      state.page = state.page + 1;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(apiGetPosts.pending, (state, action) => {
        state.status = STATUSES.pending;
        state.error = null;
      })
      .addCase(apiGetPosts.fulfilled, (state, action) => {
        state.status = STATUSES.success;
        state.posts = action.payload;
      })
      .addCase(apiGetPosts.rejected, (state, action) => {
        state.status = STATUSES.error;
        state.error = action.payload;
      })

      // ------ GET POST DETAILS

      .addCase(apiGetPostDetails.pending, (state, action) => {
        state.status = STATUSES.pending;
        state.error = null;
      })
      .addCase(apiGetPostDetails.fulfilled, (state, action) => {
        state.status = STATUSES.success;
        state.postDetails = action.payload;
      })
      .addCase(apiGetPostDetails.rejected, (state, action) => {
        state.status = STATUSES.error;
        state.error = action.payload;
      }),
});

export const { incrementPage } = postsSlice.actions;

export const postsReducer = postsSlice.reducer;
