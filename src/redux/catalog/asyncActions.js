import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchCatalogItems = createAsyncThunk(
    'catalog/fetchCatalogItems',
    async () => {
        const response = await axios.get(`https://63645ab08a3337d9a2f5d855.mockapi.io/products`)
        return response.data
    }
)

export const getItem = createAsyncThunk(
    'catalog/getItem',
    async (id) => {
        console.log('request start');
        const response = await axios.get(`https://63645ab08a3337d9a2f5d855.mockapi.io/products?id=${id}`)
        return response.data
    }
)

