import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    cartItems: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCartItems(state, action) {
            state.cartItems = [...state.cartItems, action.payload]
        },
        deleteItemfromCart(state, action) {
            state.cartItems = state.cartItems.filter((el) => el.title !== action.payload)
        }
    }
})

export const { setCartItems, deleteItemfromCart } = cartSlice.actions
export default cartSlice.reducer;