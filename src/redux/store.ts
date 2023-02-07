import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { queryApi } from './query';
import { 
    persistStore, 
    persistReducer, 
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER, } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import catalog from './catalog/catalogSlice'
import cart from './cart/cartSlice'
import auth from './auth/authSlice'

const rootReducer = combineReducers({
    catalog,
    cart,
    auth,
    [queryApi.reducerPath]: queryApi.reducer,
})

const persistConfig = {
    key: 'root',
    storage,
    blacklist: [queryApi.reducerPath]
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }).concat(queryApi.middleware),
})

export const persistor = persistStore(store)
export default store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

//ADD: Persist, Memo, Orders cab, Admin Panel, loading/failure, selectors