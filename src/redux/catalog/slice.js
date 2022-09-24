import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchCatalogItems } from './asyncActions';

const initialState = {
    items: [],
    filterItem: [],
    startPrice: 0,
    finalPrice: 1500,
};

const catalogSlice = createSlice({
    name: 'catalog',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload
        },
        sortItemsByPrice(state, action) {
            let filterItems = state.items.filter(
                (item) => Number(item.price.substring(0, item.price.length - 1)) >= Number(action.payload.startPrice),
            );
            state.filterItem = filterItems
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCatalogItems.fulfilled, (state, action) => {
            state.items = action.payload
        })
        builder.addCase(fetchCatalogItems.pending, (state, action) => {

        })
        builder.addCase(fetchCatalogItems.rejected, (state, action) => {
            console.log("Error");
        })
    }
})

export const { setItems, sortItemsByPrice } = catalogSlice.actions;
export default catalogSlice.reducer;