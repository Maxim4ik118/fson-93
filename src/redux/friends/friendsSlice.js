import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  friends: [],
  filter: '',
};

const friendsSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {
    addFriend(state, action) {
      state.friends = [...state.friends, action.payload];
    },
    removeFriend(state, action) {
      state.friends = state.friends.filter(
        friend => friend.id !== action.payload
      );
    },
    setFilter(state, action) {
      state.filter = action.payload;
    },
  },
});

export const { addFriend, setFilter, removeFriend } = friendsSlice.actions;
export const friendsReducer = friendsSlice.reducer;

