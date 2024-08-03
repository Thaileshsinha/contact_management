import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  contactData: [],
  isPopupOpen: false,
};

export const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    createContact: (state, action) => {
      state.contactData.push(action.payload);
    },
    deleteContact: (state, action) => {
      state.contactData = state.contactData.filter(
        (contact) => contact.id !== action.payload
      );
    },
    updateContact: (state, action) => {
      const index = state.contactData.findIndex(
        (contact) => contact.id === action.payload.id
      );
      if (index !== -1) {
        state.contactData[index] = action.payload;
      }
    },
    readContacts: (state) => {
      return state.contactData;
    },
    isPopupOpen: (state) => {
      state.isPopupOpen = !state.isPopupOpen;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  createContact,
  deleteContact,
  updateContact,
  readContacts,
  isPopupOpen,
} = contactSlice.actions;

export default contactSlice.reducer;
