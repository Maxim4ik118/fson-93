import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  friends: [],
  filter: '',
};

const friendsSlice = createSlice({
  // Ім'я слайсу
  name: 'friends',
  // Початковий стан редюсера слайсу
  initialState,
  // Об'єкт редюсерів
  reducers: {
    addFriend(state, action) {
      // state.friends = [...state.friends, action.payload];
      state.friends.push(action.payload);
    },
    removeFriend(state, action) {
      // const friendIndex = state.friends.findIndex(
      //   el => el.id === action.payload
      // );

      // state.friends.splice(friendIndex, 1);

      state.friends = state.friends.filter(
        friend => friend.id !== action.payload
      );
    },
    setFilter(state, action) {
      state.filter = action.payload;
    },
  },
});

// Генератори екшенів
export const { addFriend, setFilter, removeFriend } = friendsSlice.actions;
// Редюсер слайсу
export const friendsReducer = friendsSlice.reducer;

// export const friendsReducer = (state = intialState, action) => {
//   switch (action.type) {
//     case 'friends/addFriend': {
//       // action -> {type: 'friends/addFriend', payload: ...}

//       return { ...state, friends: [...state.friends, action.payload] };
//     }
//     case 'friends/removeFriend': {
//       return {
//         ...state,
//         friends: state.friends.filter(friend => friend.id !== action.payload),
//       };
//     }
//     case 'friends/setFilter': {
//       return { ...state, filter: action.payload };
//     }
//     default:
//       return state;
//   }
// };

// export const addFriend = payload => {
//   return {
//     type: 'friends/addFriend',
//     payload,
//   };
// };

// export const removeFriend = payload => {
//   return {
//     type: 'friends/removeFriend',
//     payload,
//   };
// };

// export const setFilter = payload => {
//   return {
//     type: 'friends/setFilter',
//     payload,
//   };
// };
