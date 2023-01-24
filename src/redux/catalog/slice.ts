import { createSlice, PayloadAction, current } from '@reduxjs/toolkit';
import { ICatalog, IProduct } from '../../@types/types';
import { intersect } from '../../utils/intersects';
import { fetchCatalogItems, getItem } from './asyncActions';

const initialState: ICatalog = {
    status: 'pending',
    filters: false,
    currentItem: {},
    items: [],
    filterItemByPrice: [],
    filterItemByColor: [],
    filterItemBySize: [],
    filterItemByCategory: [],
    filterItem: [],
    startPrice: 0,
    finalPrice: 1500,
    notFoundItems: false
};

const catalogSlice = createSlice({
    name: 'catalog',
    initialState,
    reducers: {
        setNotFound(state, action: PayloadAction<boolean>) {
            state.notFoundItems = action.payload
        },
        setFilterItemsByColor(state, action: PayloadAction<IProduct[]>) {
            state.filterItemByColor = action.payload
        },
        setFilterItemsBySize(state, action: PayloadAction<IProduct[]>) {
            state.filterItemBySize = action.payload
        },
        setFilterItemsByPrice(state, action: PayloadAction<IProduct[]>) {
            state.filterItemByPrice = action.payload
        },
        setFilterItemsByCategory(state, action: PayloadAction<IProduct[]>) {
            state.filterItemByCategory = action.payload
        },
        clearFilterItemsByPrice(state) {
            state.filterItemByPrice.length = 0
        },
        setFilters(state) {
            let res = intersect(current(state.filterItemByCategory), current(state.filterItemByColor), current(state.filterItemByPrice), current(state.filterItemBySize))
            state.filterItem = res
            state.filterItem.length ? state.notFoundItems = false : state.notFoundItems = true
        },
        clearFilters(state) {
            state.filterItemByColor.length = 0
            state.filterItemByPrice.length = 0
            state.filterItemBySize.length = 0
            state.filterItemByCategory.length = 0
            state.notFoundItems = false
            state.filterItem.length = 0
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getItem.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            state.currentItem = action.payload
        })
        builder.addCase(getItem.pending, (state, action) => {
            state.status = 'pending'
        })
        builder.addCase(getItem.rejected, (state, action) => {
            state.status = 'rejected'
            state.currentItem = {}
        })
        builder.addCase(fetchCatalogItems.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            state.items = action.payload
        })
        builder.addCase(fetchCatalogItems.pending, (state, action) => {
            state.status = 'pending'
        })
        builder.addCase(fetchCatalogItems.rejected, (state, action) => {
            state.status = 'rejected'
            state.items = []
        })
    }
})

export const { setFilterItemsByColor, setFilterItemsByPrice, setFilters, clearFilterItemsByPrice, clearFilters, setNotFound, setFilterItemsBySize, setFilterItemsByCategory } = catalogSlice.actions;
export default catalogSlice.reducer;