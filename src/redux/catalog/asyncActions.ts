import { IProduct } from './../../@types/types';
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const fetchCatalogItems = createAsyncThunk<IProduct[], undefined, {rejectValue: string}>(
    'catalog/fetchCatalogItems',
    async (_, {rejectWithValue}) => {
        const response = await axios.get(`http://localhost:3001/products`)
        if (response.statusText !== 'OK') {
            return rejectWithValue('Server Error')
        }
        return response.data
    }
)

export const getItem = createAsyncThunk<IProduct, string, {rejectValue: string}>(
    'catalog/getItem',
    async (id, {rejectWithValue}) => {
        const response = await axios.get(`http://localhost:3001/products?id=${id}`)
        if (response.statusText !== 'OK') {
            return rejectWithValue('Server Error')
        }
        return response.data[0]
    }
)

