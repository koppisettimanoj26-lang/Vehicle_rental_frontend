
import { configureStore } from "@reduxjs/toolkit";

import wishlistReducer, {
  loadWishlist
} from "../features/wishlistSlice";

import bookingReducer from "../features/bookingSlice";

export const store = configureStore({

  reducer: {
    wishlist: wishlistReducer,
    bookings: bookingReducer
  }

});

// Automatically save bookings whenever Redux state changes
store.subscribe(() => {

  const bookings = store.getState().bookings;

  localStorage.setItem(
    "bookings",
    JSON.stringify(bookings)
  );

});

// Load the wishlist belonging to the logged-in user
export function loadUserWishlist() {

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  if (!user) {
    store.dispatch(loadWishlist([]));
    return;
  }

  const wishlistKey = `carwishlist_${user.id}`;

  const wishlist = JSON.parse(
    localStorage.getItem(wishlistKey)
  ) || [];

  store.dispatch(loadWishlist(wishlist));
}
