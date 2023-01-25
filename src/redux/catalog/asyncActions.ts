import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchCatalogItems = createAsyncThunk(
    'catalog/fetchCatalogItems',
    async () => {
        const response = await axios.get(`http://localhost:3001/products`)
        return response.data
    }
)

export const getItem = createAsyncThunk(
    'catalog/getItem',
    async (id: string) => {
        const response = await axios.get(`http://localhost:3001/products?id=${id}`)
        return response.data[0]
    }
)

