import { createSelector } from '@reduxjs/toolkit';

const selectPosts = state => state.posts;

export const selectPostDetails = createSelector(
  selectPosts,
  posts => posts.postDetailedData
);
export const selectPostDetailsStatus = createSelector(
  selectPosts,
  posts => posts.status
);
export const selectPostDetailsError = createSelector(
  selectPosts,
  posts => posts.error
);
export const selectPostDetailsPage = createSelector(
  selectPosts,
  posts => posts.page
);
export const selectPostDetailsPosts = createSelector(
  selectPosts,
  posts => posts.posts
);
