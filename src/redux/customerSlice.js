import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CustomerService from "../services/customerService";
import LocationRegionService from "../services/locationRegionService";


export const fetchAllCustomer = createAsyncThunk(
    'customer/fetchAllCustomer',
    async () => {
        const response = await CustomerService.getCustomers();
        return response.data;
    }
)

export const fetchCreateCustomer = createAsyncThunk(
    'customer/fetchCreateCustomer',
    async (data) => {
        const response = await CustomerService.postCustomer(data);
        return response.data
    }
)

export const fetchAllProvince = createAsyncThunk(
    'customer/fetchAllProvince',
    async () => {
        const response = await LocationRegionService.getAllProvince();
        return response.data.results;
    }
)
console.log(fetchAllProvince);

export const fetchAllDistrict = createAsyncThunk(
    'customer/fetchAllDistrict',
    async (provinceId) => {
        const response = await LocationRegionService.getAllDistrict(provinceId);
        return response.data.results;
    }
)

export const fetchAllWard = createAsyncThunk(
    'customer/fetchAllWard',
    async (districtId) => {
        const response = await LocationRegionService.getAllWard(districtId);
        return response.data.results;
    }
)

export const customerSlice = createSlice({
    name: 'customer',
    initialState: {
        data: [],
        spa: [],
        locationRegion: {

        },
        province: [],
        district: [],
        ward: [],
        loading: false
    },
    reducers: {
        changeProvince: (state, action) => {
            state.locationRegion.provinceName = action.payload;
        },
        changeDistrict: (state, action) => {
            state.locationRegion.districtName = action.payload;
        },
        changeWard: (state, action) => {
            state.locationRegion.wardName = action.payload;
        }
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
            .addCase(fetchAllProvince.fulfilled, (state, action) => {
                state.province = action.payload;
                state.district = [];
            })
            .addCase(fetchAllDistrict.fulfilled, (state, action) => {
                state.district = action.payload;
                state.ward = [];
            })
            .addCase(fetchAllWard.fulfilled, (state, action) => {
                state.ward = action.payload;
            })
            .addCase(fetchCreateCustomer.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCreateCustomer.fulfilled, (state, action) => {
                console.log(action.payload);
                state.data.push(action.payload);
                state.loading = false;
            })
            .addCase(fetchCreateCustomer.rejected, () => {

            });
    }
})
export const { changeProvince, changeDistrict, changeWard } = customerSlice.actions;
export default customerSlice.reducer