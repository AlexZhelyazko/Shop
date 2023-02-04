import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { CartProduct, ICartProducts } from "../../@types/types"


const initialState: ICartProducts = {
    cartItems: [],
    totalPrice: 0,
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCartItems(state, action: PayloadAction<CartProduct>) {
            state.cartItems = [...state.cartItems, action.payload]
        },
        clearCart(state) {
            state.cartItems.length = 0
        },
    }
})

export const { setCartItems, clearCart } = cartSlice.actions
export default cartSlice.reducer;