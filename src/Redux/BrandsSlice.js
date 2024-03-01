import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

let initialState = { brands: [], isLoading: false, error: null }

export let getBrands = createAsyncThunk('brandsSlice/getBrands',
    async () => {
        let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
            .catch((err) => err);
        return data.data //lma yraga3ha hyro7 y5azenha
    }
)

let brandsSlice = createSlice({
    name: 'brandsSlice',
    initialState,
    extraReducers: (builder) => {//bytb3tlha 7aga esmha builder
        builder.addCase(getBrands.pending, (state, builder) => {
            state.isLoading = true
        });
        builder.addCase(getBrands.fulfilled, (state, action) => {
            state.brands = action.payload
            state.isLoading = false
        })
    }
})
export let BrandsReducer = brandsSlice.reducer