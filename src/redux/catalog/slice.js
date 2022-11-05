import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { store } from '../store';
import { fetchCatalogItems } from './asyncActions';

const initialState = {
    filters: false,
    items: [],
    filterItem: [],
    filterItemByPrice: [],
    filterItemByColor: [],
    filterItemBySize: [],
    startPrice: 0,
    finalPrice: 1500,
    notFoundItems: false
};

const catalogSlice = createSlice({
    name: 'catalog',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload
        },
        setNotFound(state, action) {
            state.notFoundItems = action.payload
        },
        setFilterItemsByColor(state, action) {
            state.filterItemByColor = action.payload
        },
        setFilterItemsBySize(state, action) {
            state.filterItemBySize = action.payload
        },
        setFilterItemsByPrice(state, action) {
            state.filterItemByPrice = action.payload
        },
        clearFilterItemsByPrice(state, action) {
            state.filterItemByPrice.length = 0
        },
        setFilters(state, action) {
            if (state.filterItemBySize.length === 0 && state.filterItemByPrice.length === 0 && state.filterItemByColor.length === 0) {
                return state
            } else if (state.filterItemBySize.length === 0 && state.filterItemByPrice.length !== 0 && state.filterItemByColor.length === 0) {
                state.filterItem = [...state.filterItemByPrice]
            } else if (state.filterItemBySize.length !== 0 && state.filterItemByPrice.length !== 0 && state.filterItemByColor.length === 0) {
                state.filterItem = state.filterItemByPrice.filter(el => state.filterItemBySize.some(el2 => el.title === el2.title))
                state.filterItem.length ? state.notFoundItems = false : state.notFoundItems = true
            } else if (state.filterItemBySize.length === 0 && state.filterItemByPrice.length !== 0 && state.filterItemByColor.length !== 0) {
                state.filterItem = state.filterItemByPrice.filter(el => state.filterItemByColor.some(el2 => el.title === el2.title))
                state.filterItem.length ? state.notFoundItems = false : state.notFoundItems = true
            } else if (state.filterItemBySize.length !== 0 && state.filterItemByPrice.length === 0 && state.filterItemByColor.length === 0) {
                state.filterItem = [...state.filterItemBySize]
            } else if (state.filterItemBySize.length !== 0 && state.filterItemByPrice.length === 0 && state.filterItemByColor.length !== 0) {
                state.filterItem = state.filterItemBySize.filter(el => state.filterItemByColor.some(el2 => el.title === el2.title))
                state.filterItem.length ? state.notFoundItems = false : state.notFoundItems = true
            } else if (state.filterItemBySize.length === 0 && state.filterItemByPrice.length === 0 && state.filterItemByColor.length !== 0) {
                state.filterItem = [...state.filterItemByColor]
            } else if (state.filterItemBySize.length !== 0 && state.filterItemByPrice.length !== 0 && state.filterItemByColor.length) {
                let newfilterArr = state.filterItemByPrice.filter(el => state.filterItemBySize.some(el2 => el.title === el2.title))
                state.filterItem = newfilterArr.filter(el => state.filterItemByColor.some(el2 => el.title === el2.title))
                state.filterItem.length ? state.notFoundItems = false : state.notFoundItems = true
            }
        },
        clearFilters(state, action) {
            state.filterItemByColor.length = 0
            state.filterItemByPrice.length = 0
            state.filterItemBySize.length = 0
            state.filterItem.length = 0
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

export const { setItems, setFilterItemsByColor, setFilterItemsByPrice, setFilters, clearFilterItemsByPrice, clearFilters, setNotFound, setFilterItemsBySize } = catalogSlice.actions;
export default catalogSlice.reducer;