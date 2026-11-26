
import { createSlice } from "@reduxjs/toolkit";

// Get the currently logged-in user
const getUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

// Get wishlist for the logged-in user
const getWishlist = () => {
  const user = getUser();

  if (!user) {
    return [];
  }

  const wishlistKey = `carwishlist_${user.id}`;

  return JSON.parse(
    localStorage.getItem(wishlistKey)
  ) || [];
};

const wishlistSlice = createSlice({
  name: "wishlist",

  initialState: getWishlist(),

  reducers: {
    addWishlist: (state, action) => {
      const exists = state.some(
        product => product.id === action.payload.id
      );

      if (exists) {
        alert("Already in wishlist!");
        return;
      }

      state.push(action.payload);

      const user = getUser();

      if (user) {
        localStorage.setItem(
          `carwishlist_${user.id}`,
          JSON.stringify(state)
        );
      }

      alert("Added to wishlist!");
    },

    removeWishlist: (state, action) => {
      const updated = state.filter(
        product => product.id !== action.payload
      );

      const user = getUser();

      if (user) {
        localStorage.setItem(
          `carwishlist_${user.id}`,
          JSON.stringify(updated)
        );
      }

      return updated;
    },

    loadWishlist: (state, action) => {
      return action.payload;
    }
  }
});

export const {
  addWishlist,
  removeWishlist,
  loadWishlist
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
