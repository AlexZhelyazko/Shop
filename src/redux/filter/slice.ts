import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    startPrice: 0,
    finalPrice: 1000,
}

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
    }
})

export default filterSlice.reducer;