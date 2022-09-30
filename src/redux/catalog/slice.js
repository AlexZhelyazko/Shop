import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchCatalogItems } from './asyncActions';

const initialState = {
    filters: false,
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
            state.filters = true
            let filterItems = state.items.filter(
                (item) => Number(item.price.substring(0, item.price.length - 1)) >= Number(action.payload[0]) && Number(item.price.substring(0, item.price.length - 1)) <= Number(action.payload[1]),
            );
            state.filterItem = filterItems
        },
        sortItemsByColor(state, action) {
            if (state.filterItem.length === 0) {
                let filterItems = state.items.filter(
                    (item) => action.payload.includes(item.color)
                )
                state.filterItem = filterItems
            } else {
                let filterItems = state.filterItem.filter(
                    (item) => action.payload.includes(item.color)
                )
                state.filterItem = filterItems
            }
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

export const { setItems, sortItemsByPrice, sortItemsByColor } = catalogSlice.actions;
export default catalogSlice.reducer;