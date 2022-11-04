import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchCatalogItems = createAsyncThunk(
    'catalog/fetchCatalogItems',
    async (location) => {
        const response = await axios.get(`https://63645ab08a3337d9a2f5d855.mockapi.io/products`)
        // const response = await axios.get(`https://63289772d2c97d8c525a0b8c.mockapi.io/api/products${location.pathname}`)
        return response.data
    }
)
