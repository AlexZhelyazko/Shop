import { useDispatch } from 'react-redux';
import { configureStore } from "@reduxjs/toolkit";
import catalog from './catalog/slice'
import filter from './filter/slice'
import cart from './cart/cartSlice'

export const store = configureStore({
    reducer: {
        catalog,
        filter,
        cart,
    }
})

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
