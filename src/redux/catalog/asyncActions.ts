import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchCatalogItems = createAsyncThunk(
    'catalog/fetchCatalogItems',
    async () => {
        const response = await axios.get('https://63289772d2c97d8c525a0b8c.mockapi.io/api/products/items')
        return response.data
    }
)
