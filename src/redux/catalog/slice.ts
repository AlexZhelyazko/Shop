import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    items: []
};

const catalogSlice = createSlice({
    name: 'catalog',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload
        }
    }
})

export const {setItems} = catalogSlice.actions;
export default catalogSlice.reducer;