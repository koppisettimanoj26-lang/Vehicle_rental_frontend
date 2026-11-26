
import { createSlice } from "@reduxjs/toolkit";

// Load existing bookings from LocalStorage
const savedBookings =
  JSON.parse(localStorage.getItem("bookings")) || [];

const bookingSlice = createSlice({

  name: "bookings",

  initialState: savedBookings,

  reducers: {

    // Add new booking
    addBooking: (state, action) => {
      state.push(action.payload);
    },

    // Cancel booking
    cancelBooking: (state, action) => {

      return state.filter(
        booking => booking.id !== action.payload
        );

    }

  }

});

export const {
  addBooking,
  cancelBooking
} = bookingSlice.actions;

export default bookingSlice.reducer;
