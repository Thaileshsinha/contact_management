import { configureStore } from "@reduxjs/toolkit";
import contactSlice from "./redux/contactSlice";

export const store = configureStore({
  reducer: {
    contact: contactSlice,
  },
});
