import { PayloadAction } from '@reduxjs/toolkit';
import { IUser } from './../../@types/types';
import { createSlice } from '@reduxjs/toolkit';
interface IAuth {
    isAuth: boolean,
    currentUser: IUser | []
}

const initialState: IAuth = {
    isAuth: false,
    currentUser: [],
}

const auhtSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsAuth(state, action: PayloadAction<boolean>) {
            state.isAuth = action.payload
        },
        setCurrentUser(state, action: PayloadAction<IUser>) {
            state.currentUser = action.payload
        }
    }
})

export const {setIsAuth, setCurrentUser} = auhtSlice.actions
export default auhtSlice.reducer