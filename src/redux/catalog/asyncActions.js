import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchCatalogItems = createAsyncThunk(
    'catalog/fetchCatalogItems',
    async (params) => {
        const response = await axios.get(`https://63645ab08a3337d9a2f5d855.mockapi.io/products?category=${Object.values(params)[0]}`)
        return response.data
    }
)
