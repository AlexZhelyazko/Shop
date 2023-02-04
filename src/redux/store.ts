import { configureStore } from "@reduxjs/toolkit";
import { queryApi } from './query';
import catalog from './catalog/catalogSlice'
import cart from './cart/cartSlice'
import auth from './auth/authSlice'

export const store = configureStore({
    reducer: {
        catalog,
        cart,
        auth,
        [queryApi.reducerPath]: queryApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(queryApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

//ADD: Persist, Memo, Orders cab, Admin Panel, loading/failure, selectors