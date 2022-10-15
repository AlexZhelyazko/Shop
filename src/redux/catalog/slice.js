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
            state.filterItemByPrice = action.payload
        },
        clearFilterItemsByPrice(state, action) {
            state.filterItemByPrice.length = 0
        },
        setFilters(state, action) {
            if (state.filterItemByColor.length === 0 && state.filterItemByPrice.length === 0) {
                return state
            } else if (state.filterItemByColor.length === 0 && state.filterItemByPrice.length !== 0) {
                console.log("FILTER PRICE");
                state.filterItem = [...state.filterItemByPrice]
            } else if (state.filterItemByColor.length !== 0 && state.filterItemByPrice.length === 0) {
                state.filterItem = [...state.filterItemByColor]
            } else if (state.filterItemByColor.length !== 0 && state.filterItemByPrice.length !== 0) {
                state.filterItem = state.filterItemByPrice.filter(el => state.filterItemByColor.some(el2 => el.title === el2.title))
            }
        }
        // setFilters(state, action) {
        //     if (state.filterItemByPrice.length === 0) {
        //         state.filterItem = [...state.filterItemByColor]
        //     } else if (state.filterItemByColor.length === 0) {
        //         state.filterItem = [...state.filterItemByPrice]
        //     } else {
        //         state.filterItem = state.filterItemByPrice.filter(el => state.filterItemByColor.some(el2 => el.title === el2.title))
        //     }
        // }
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

export const { setItems, setFilterItemsByColor, setFilterItemsByPrice, setFilters, clearFilterItemsByPrice } = catalogSlice.actions;
export default catalogSlice.reducer;