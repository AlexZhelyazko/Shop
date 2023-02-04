import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { CartProduct, ICartProducts } from "../../@types/types"


const initialState: ICartProducts = {
    cartItems: [],
    totalPrice: 0,
}

type ParamsForCalcTotalPrice  ={
    id: number,
    price: any
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCartItems(state, action: PayloadAction<CartProduct>) {
            state.cartItems = [...state.cartItems, action.payload]
            //state.totalPrice = state.cartItems.reduce((acc, num) => acc + +num.price.slice(1, -2).replace(/[\s.,%]/g, '') * num.count, 0)
        },
        clearCart(state) {
            state.cartItems.length = 0
        },
        deleteItemfromCart(state, action: PayloadAction<ParamsForCalcTotalPrice>) {
            state.cartItems = state.cartItems.filter((el) => el.id !== action.payload.id)
            state.totalPrice -= action.payload.price
        },
        addItem(state, action: PayloadAction<ParamsForCalcTotalPrice>) {
            let findItem = state.cartItems.find(obj => obj.id === action.payload.id)
            state.totalPrice += +action.payload.price.slice(1, -2).replace(/[\s.,%]/g, '')
            findItem!.count++
        },
        minusItem(state, action: PayloadAction<ParamsForCalcTotalPrice>) {
            let findItem = state.cartItems.find(obj => obj.id === action.payload.id)
            state.totalPrice -= +action.payload.price.slice(1, -2).replace(/[\s.,%]/g, '')
            if (findItem!.count === 1) {
                state.cartItems = state.cartItems.filter((el) => el.id !== action.payload.id)
            } else {
                findItem!.count--
            }
        }
    }
})

export const { setCartItems, deleteItemfromCart, addItem, minusItem, clearCart } = cartSlice.actions
export default cartSlice.reducer;