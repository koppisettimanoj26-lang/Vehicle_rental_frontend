import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice=createSlice({
    name:'wishlist',
    initialState:
    JSON.parse(
    localStorage.getItem(
      "carwishlist"
    )
  ) || [],
    reducers:{
        addWishlist:(state,action)=>{
            state.push(action.payload)
            alert('add to wishlist')
            
            localStorage.setItem(
            "carwishlist",
            JSON.stringify(state)
            );
        },
        removeWishlist:(state,action)=>{
            const updated =
            state.filter(
            product =>
            product.id !==
            action.payload
            );

            localStorage.setItem(
            "carwishlist",
            JSON.stringify(updated)
            );

            return updated;

        }
    }

})

export const{addWishlist,removeWishlist}=wishlistSlice.actions
export default wishlistSlice.reducer