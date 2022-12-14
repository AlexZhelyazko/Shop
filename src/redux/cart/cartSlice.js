import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    cartItems: []
}

//cartItem ={title: '', count: '', size: '', image: ''}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCartItems(state, action) {
            state.cartItems = [...state.cartItems, action.payload]
        },
        // setCartItems(state, action) {
        //     let findItem = state.cartItems.find(obj => obj.title === action.payload.title)
        //     console.log(action.payload);
        //     console.log(findItem);
        //     if (findItem) {
        //         findItem.count++
        //     } else {
        //         let item = { ...action.payload, count: 1 }
        //         state.cartItems = [...state.cartItems, item]
        //         //state.cartItems = {...state.cartItems, action.payload, count: 1}
        //     }
        // },
        deleteItemfromCart(state, action) {
            state.cartItems = state.cartItems.filter((el) => el.title !== action.payload)
        },
        addItem(state, action) {
            let findItem = state.cartItems.find(obj => obj.title === action.payload)
            findItem.count++
        },
        minusItem(state, action) {
            let findItem = state.cartItems.find(obj => obj.title === action.payload)
            if (findItem.count === 1) {
                state.cartItems = state.cartItems.filter((el) => el.title !== action.payload)
            } else {
                findItem.count--
            }
        }
    }
})

export const { setCartItems, deleteItemfromCart, addItem, minusItem } = cartSlice.actions
export default cartSlice.reducer;