import { useDispatch } from 'react-redux';
import { configureStore } from "@reduxjs/toolkit";
import catalog from './catalog/slice'
import cart from './cart/cartSlice'
import auth from './auth/authSlice'
import { authApi } from './auth/asyncActions';

export const store = configureStore({
    reducer: {
        catalog,
        cart,
        auth,
        [authApi.reducerPath]: authApi.reducer,

    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
