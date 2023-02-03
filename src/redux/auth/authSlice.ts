import { IUser } from './../../@types/types';
import { createSlice } from '@reduxjs/toolkit';
//TODO type IUSER
interface IAuth {
    isAuth: boolean,
    currentUser: any
}

const initialState: IAuth = {
    isAuth: false,
    currentUser: [],
}

const auhtSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsAuth(state, action) {
            state.isAuth = action.payload
        },
        setCurrentUser(state, action) {
            state.currentUser = action.payload
        }
    }
})

export const {setIsAuth, setCurrentUser} = auhtSlice.actions
export default auhtSlice.reducer