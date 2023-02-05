import { RootState } from './store';
export const getCartItems = (state:RootState) => state.cart.cartItems
export const getIsAuth = (state: RootState) => state.auth.isAuth
export const getCurrentUser = (state: RootState) => state.auth.currentUser
/*export const selectSmth = createSelector([...], func)*/