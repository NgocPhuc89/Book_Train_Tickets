import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CustomerService from "../services/customerService";

export const fetchAllCustomer = createAsyncThunk(
    'customer/fetchAllCustomer',
    async () => {
        const response = await CustomerService.getCustomers();
        return response.data;
    }
)

export const customerSlice = createSlice({
    name: 'customer',
    initialState: {
        data: [],
        spa: [],
        locationRegion: {
            provinceId: "",
            provinceName: "",
            districtId: "",
            districtName: "",
            wardId: "",
            wardName: ""
        },
        loading: false
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllCustomer.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAllCustomer.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loading = false;
            })
            .addCase(fetchAllCustomer.rejected, () => {

            });

        builder
            .addCase
    }
})

export default customerSlice.reducer