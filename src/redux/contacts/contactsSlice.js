import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { $authInstance } from '../../redux/auth/authSlice';

export const apiGetContacts = createAsyncThunk(
  'contacts/apiGetContacts',
  async (_, thunkApi) => {
    try {
      const { data } = await $authInstance.get('/contacts');

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const apiAddContact = createAsyncThunk(
  'contacts/apiAddContact',
  async (formData, thunkApi) => {
    try {
      const { data } = await $authInstance.post('/contacts', formData);

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const apiRemoveContact = createAsyncThunk(
  'contacts/apiRemoveContact',
  async (contactId, thunkApi) => {
    try {
      const { data } = await $authInstance.delete(`/contacts/${contactId}`);

      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  contacts: null,
  error: null,
  isLoading: false,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  extraReducers: builder =>
    builder
      .addCase(apiGetContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts = action.payload;
      })
      .addCase(apiAddContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.contacts = [...state.contacts, action.payload];
      })
      .addCase(apiRemoveContact.fulfilled, (state, action) => {
        // action.payload -> { id: "213123", name: " John", number: "12312" }
        state.isLoading = false;
        state.contacts = state.contacts.filter(
          contact => contact.id !== action.payload.id
        );
      })

      .addMatcher(
        isAnyOf(
          apiGetContacts.pending,
          apiAddContact.pending,
          apiRemoveContact.pending
        ),
        state => {
          state.isLoading = true;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          apiGetContacts.rejected,
          apiAddContact.rejected,
          apiRemoveContact.rejected
        ),
        (state, action) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      ),
});

export const contactsReducer = contactsSlice.reducer;
