import { PayloadAction } from '@reduxjs/toolkit';
import { IUser } from './../../@types/types';
import { createSlice } from '@reduxjs/toolkit';
import { PURGE } from 'redux-persist';
interface IAuth {
    isAuth: boolean,
    currentUser: any
}

const initialState: IAuth = {
    isAuth: false,
    currentUser: {
        // id: null,
        // email: '',
        // name: '',
        // role: '',
        // avatar:'',
        // basket: [],
        // history: [],
    },
}

const auhtSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsAuth(state, action: PayloadAction<boolean>) {
            state.isAuth = action.payload
        },
        setCurrentUser(state, action: PayloadAction<IUser | {}>) {
            state.currentUser = action.payload
        }
    },
    // extraReducers: (builder) => {
    //     builder.addCase(PURGE, (state) => {
    //         customEntityAdapter.removeAll(state);
    //     });
    // }
})

export const {setIsAuth, setCurrentUser} = auhtSlice.actions
export default auhtSlice.reducer