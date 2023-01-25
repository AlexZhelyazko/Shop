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
            state.totalPrice = state.cartItems.reduce((acc, num) => acc + +num.price.slice(1, -2).replace(/[\s.,%]/g, '') * num.count,state.totalPrice)
        },
        deleteItemfromCart(state, action: PayloadAction<string>) {
            state.cartItems = state.cartItems.filter((el) => el.title !== action.payload)
        },
        addItem(state, action: PayloadAction<string>) {
            let findItem = state.cartItems.find(obj => obj.title === action.payload)
            findItem!.count++
        },
        minusItem(state, action: PayloadAction<string>) {
            let findItem = state.cartItems.find(obj => obj.title === action.payload)
            if (findItem!.count === 1) {
                state.cartItems = state.cartItems.filter((el) => el.title !== action.payload)
            } else {
                findItem!.count--
            }
        }
    }
})

export const { setCartItems, deleteItemfromCart, addItem, minusItem } = cartSlice.actions
export default cartSlice.reducer;