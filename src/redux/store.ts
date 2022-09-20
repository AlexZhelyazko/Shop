import { useDispatch } from 'react-redux';
import { configureStore } from "@reduxjs/toolkit";
import catalog from './catalog/slice'

export const store = configureStore({
    reducer: {
        catalog
    }
})

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();