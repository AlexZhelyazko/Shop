import { createSlice, PayloadAction, current } from '@reduxjs/toolkit';
import { store } from '../store';
import { fetchCatalogItems } from './asyncActions';

const initialState = {
    status: 'pending',
    filters: false,
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

// Filter xs where, for a given x, there exists some y in ys where y === x.
const intersect3 = (xs, ys) => xs.filter(x => ys.some(y => y.title === x.title));

// When there is only one array left, return it (the termination condition
// of the recursion). Otherwise first find the intersection of the first
// two arrays (intersect2), then repeat the whole process for that result
// combined with the remaining arrays (intersect). Thus the number of arrays
// passed as arguments to intersect is reduced by one each time, until
// there is only one array remaining.
// function intersect(xs, ys, ...rest) {
//     let lists = []
//     for (let i = 0; i < arguments[0].length; i++) {
//         if (arguments[0][i].length !== 0) {
//             lists.push(arguments[0][i])
//         }
//     }
// }
function intersect(...rest) {
    let nonEmptyArrays = []
    for (let i = 0; i < rest.length; i++) {
        if (rest[i].length !== 0) {
            nonEmptyArrays.push(rest[i])
        }
    }
    console.log(nonEmptyArrays[0]);
    const firsrArr = nonEmptyArrays[0]
    const secondArr = nonEmptyArrays[1]
    const params = nonEmptyArrays[2]?.slice(2, nonEmptyArrays.length)
    return intersect2(firsrArr, secondArr, params)
}

function intersect2(xs, ys, ...rest) {
    // console.log(xs);
    // console.log(ys);
    // console.log(rest);
    if (ys === undefined) {
        return xs
    } else {
        intersect2(intersect3(xs, ys), ...rest)
    }
}

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
        setFilterItemsByCategory(state, action) {
            state.filterItemByCategory = action.payload
        },
        clearFilterItemsByPrice(state, action) {
            state.filterItemByPrice.length = 0
        },
        setFilters(state, action) {
            let res = intersect(current(state.filterItemByCategory), current(state.filterItemByColor), current(state.filterItemByPrice), current(state.filterItemBySize))
            console.log(res);
            state.filterItem = res
            state.filterItem.length ? state.notFoundItems = false : state.notFoundItems = true
        },
        clearFilters(state, action) {
            state.filterItemByColor.length = 0
            state.filterItemByPrice.length = 0
            state.filterItemBySize.length = 0
            state.filterItemByCategory.length = 0
            state.notFoundItems = false
            state.filterItem.length = 0
        }
    },
    extraReducers: (builder) => {
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

export const { setItems, setFilterItemsByColor, setFilterItemsByPrice, setFilters, clearFilterItemsByPrice, clearFilters, setNotFound, setFilterItemsBySize, setFilterItemsByCategory } = catalogSlice.actions;
export default catalogSlice.reducer;