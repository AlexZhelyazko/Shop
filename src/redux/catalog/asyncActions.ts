import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchCatalogItems = createAsyncThunk(
    'catalog/fetchCatalogItems',
    async (params) => {
        console.log(params);
        
        const response = await axios.get(`https://63289772d2c97d8c525a0b8c.mockapi.io/api/products/items?search=${params}`)
        return response.data
    }
)
