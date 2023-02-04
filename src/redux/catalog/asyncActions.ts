import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from 'axios';

export const fetchCatalogItems = createAsyncThunk<>(
    'catalog/fetchCatalogItems',
    async () => {
        try {
            const response = await axios.get(`http://localhost:3001/products`)
            return response.data
        } catch (error) {
            let err: AxiosError<Validation> = error
        }
    }
)

export const getItem = createAsyncThunk(
    'catalog/getItem',
    async (id: string) => {
        const response = await axios.get(`http://localhost:3001/products?id=${id}`)
        return response.data[0]
    }
)

