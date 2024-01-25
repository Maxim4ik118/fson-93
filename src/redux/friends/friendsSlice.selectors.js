import { createSelector } from '@reduxjs/toolkit';

export const selectFriends = state => state.friendsScope.friends;
export const selectFriendsFilter = state => state.friendsScope.filter;

export const selectFilteredFriends = createSelector(
  [selectFriends, selectFriendsFilter],
  (friends, filter) => {
    return friends.filter(profile =>
      profile.name.toLowerCase().includes(filter.trim().toLowerCase())
    );
  }
);
