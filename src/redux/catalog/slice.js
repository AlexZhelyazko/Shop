import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { store } from '../store';
import { fetchCatalogItems } from './asyncActions';

const initialState = {
    filters: false,
    items: [],
    filterItem: [],
    filterItemByPrice: [],
    filterItemByColor: [],
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
        setFilterItemsByColor(state, action) {
            state.filterItemByColor = action.payload
        },
        setFilterItemsByPrice(state, action) {
            state.filterItemByColor = action.payload
        },
        setFilters(state, action) {
            if (state.filterItemByPrice.length === 0) {
                state.filterItem = [...state.filterItemByColor]
            } else if (state.filterItemByColor === 0) {
                state.filterItem = [...state.filterItemByPrice]
            } else {
                state.filterItem = state.filterItemByPrice.filter(el => state.filterItemByColor.some(el2 => el.title === el2.title))
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

export const { setItems, setFilterItemsByColor, setFilterItemsByPrice, setFilters } = catalogSlice.actions;
export default catalogSlice.reducer;