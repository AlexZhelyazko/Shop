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

function intersection() {
    let result = [];
    let lists = [];
    for (let i = 0; i < arguments[0].length; i++) {
        if (arguments[0][i].length !== 0) {
            lists.push(arguments[0][i])
        }
    }
    console.log(lists);
    // if (arguments.length === 1) {
    //     lists = arguments[0];
    // } else {
    //     lists = arguments;
    // }
    for (var i = 0; i < lists.length - 1; i++) {
        var currentList = lists[i];
        let filteredArr = lists[i + 1].filter(el => currentList.some(el2 => el2.title === el.title))
        result.push(filteredArr)
        // for (var y = 0; y < currentList.length; y++) {
        //     var currentValue = currentList[y];
        //     if (result.title.indexOf(currentValue) === -1) {
        //         if (lists.filter(function (obj) { return obj.title.indexOf(currentValue) == -1 }).length == 0) {
        //             result.push(currentValue);
        //         }
        //     }
        // }
    }
    console.log(result[0]);
    return result[0];
}


// function intersection() {
//     var result = [];
//     var lists = [];
//     for (let i = 0; i < arguments.length; i++) {
//         if (i.length !== 0) {
//             lists.push(i)
//         }
//     }
//     for (let i = 0; i < lists.length - 1; i++) {
//         let currentList = lists[i];
//         result = currentList.filter(el => lists[i + 1].some(el2 => el2.title === el.title))
//     }

// for (var i = 0; i < lists.length; i++) {
//     var currentList = lists[i];
//     for (var y = 0; y < currentList.length; y++) {
//         var currentValue = currentList[y];
//         if (result.indexOf(currentValue) === -1) {
//             var existsInAll = true;
//             for (var x = 0; x < lists.length; x++) {
//                 if (lists[x].indexOf(currentValue) === -1) {
//                     existsInAll = false;
//                     break;
//                 }
//             }
//             if (existsInAll) {
//                 result.push(currentValue);
//             }
//         }
//     }
// }
//     return result;
// }

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
            // let data = [state.filterItemByCategory, state.filterItemByColor, state.filterItemByPrice, state.filterItemBySize]
            // state.filterItem = data.reduce((a, b) => a.filter(c => b.title.includes(c.title)))
            // console.log(state.filterItem);
            state.filterItem = intersection([current(state.filterItemByCategory), current(state.filterItemByColor), current(state.filterItemByPrice), current(state.filterItemBySize)])
            console.log(state.filterItem);
            state.filterItem.length ? state.notFoundItems = false : state.notFoundItems = true
        },
        // setFilters(state, action) {
        //     console.log(state.filterItemByColor);
        //     if (state.filterItemBySize.length === 0 && state.filterItemByPrice.length === 0 && state.filterItemByColor.length === 0) {
        //         return state
        //     } else if (state.filterItemBySize.length === 0 && state.filterItemByPrice.length !== 0 && state.filterItemByColor.length === 0) {
        //         state.filterItem = [...state.filterItemByPrice]
        //     } else if (state.filterItemBySize.length !== 0 && state.filterItemByPrice.length !== 0 && state.filterItemByColor.length === 0) {
        //         state.filterItem = state.filterItemByPrice.filter(el => state.filterItemBySize.some(el2 => el.title === el2.title))
        //         state.filterItem.length ? state.notFoundItems = false : state.notFoundItems = true
        //     } else if (state.filterItemBySize.length === 0 && state.filterItemByPrice.length !== 0 && state.filterItemByColor.length !== 0) {
        //         state.filterItem = state.filterItemByPrice.filter(el => state.filterItemByColor.some(el2 => el.title === el2.title))
        //         state.filterItem.length ? state.notFoundItems = false : state.notFoundItems = true
        //     } else if (state.filterItemBySize.length !== 0 && state.filterItemByPrice.length === 0 && state.filterItemByColor.length === 0) {
        //         state.filterItem = [...state.filterItemBySize]
        //     } else if (state.filterItemBySize.length !== 0 && state.filterItemByPrice.length === 0 && state.filterItemByColor.length !== 0) {
        //         state.filterItem = state.filterItemBySize.filter(el => state.filterItemByColor.some(el2 => el.title === el2.title))
        //         state.filterItem.length ? state.notFoundItems = false : state.notFoundItems = true
        //     } else if (state.filterItemBySize.length === 0 && state.filterItemByPrice.length === 0 && state.filterItemByColor.length !== 0) {
        //         state.filterItem = [...state.filterItemByColor]
        //     } else if (state.filterItemBySize.length !== 0 && state.filterItemByPrice.length !== 0 && state.filterItemByColor.length) {
        //         let newfilterArr = state.filterItemByPrice.filter(el => state.filterItemBySize.some(el2 => el.title === el2.title))
        //         state.filterItem = newfilterArr.filter(el => state.filterItemByColor.some(el2 => el.title === el2.title))
        //         state.filterItem.length ? state.notFoundItems = false : state.notFoundItems = true
        //     }
        // },
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