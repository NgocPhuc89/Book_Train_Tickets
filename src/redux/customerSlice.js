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

export const fetchCustomerById = createAsyncThunk(
    'customer/fetchCustomerById',
    async (customerId) => {
        const response = await CustomerService.getCustomer(customerId);
        return response.data
    }
)

export const fetchCustomerSearch = createAsyncThunk(
    'customer/fetchCustomerSearch',
    async (search) => {
        const response = await CustomerService.getCustomerSearch(search);
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

export const fetchEditCustomer = createAsyncThunk(
    'customer/fetchEditCustomer',
    async (data) => {
        const response = await CustomerService.editCustomer(data.customerId, data);
        return response.data;
    }
)

export const fetchDeleteCustomer = createAsyncThunk(
    'customer/fetchDeleteCustomer',
    async (customerId) => {
        const response = await CustomerService.deleteCustomer(customerId);
        return response.data;
    }
)

export const fetchAllProvince = createAsyncThunk(
    'customer/fetchAllProvince',
    async () => {
        const response = await LocationRegionService.getAllProvince();
        return response.data.results;
    }
)

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
        search: "",
        data: [],
        spa: [],
        currentLocationRegion: {
            province_id: "",
            province_name: "",
            district_id: "",
            district_name: "",
            ward_id: "",
            ward_name: ""
        },
        currenCustomer: {},
        customerId: "",
        province: [],
        district: [],
        ward: [],
        loading: false
    },
    reducers: {
        changeProvince: (state, action) => {
            const { value, text } = action.payload;
            state.currentLocationRegion.province_id = value;
            state.currentLocationRegion.province_name = text;
        },
        changeDistrict: (state, action) => {
            const { value, text } = action.payload;
            state.currentLocationRegion.district_id = value;
            state.currentLocationRegion.district_name = text;
        },
        changeWard: (state, action) => {
            const { value, text } = action.payload;
            state.currentLocationRegion.ward_id = value;
            state.currentLocationRegion.ward_name = text;
        },
        changeSearch: (state, action) => {
            state.search = action.payload;
        },
        editCustomer: (state, action) => {
            state.customerId = action.payload;
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
        builder  //create
            .addCase(fetchCreateCustomer.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCreateCustomer.fulfilled, (state, action) => {
                state.data.push(action.payload)
                state.loading = false;
            })
            .addCase(fetchCreateCustomer.rejected, () => {

            });
        builder  //update
            .addCase(fetchCustomerById.fulfilled, (state, action) => {
                state.currenCustomer = action.payload;
                state.currentLocationRegion = action.payload.locationRegion
            })
            .addCase(fetchEditCustomer.fulfilled, (state, action) => {
                state.data = action.payload;
            });
        builder  //show list & search 
            .addCase(fetchCustomerSearch.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCustomerSearch.fulfilled, (state, action) => {
                state.data = action.payload;
                state.loading = false;
            });
        builder  // delete    
            .addCase(fetchDeleteCustomer.fulfilled, (state, action) => {
                const id = action.meta.arg;
                state.data = state.data.filter((prev) => prev.id !== id)
            });
        builder  //show locationRegion
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
            ;
    }
})
export const { changeProvince,
    changeDistrict,
    changeWard,
    changeCurrenCustomer,
    changeLocationRegion,
    changeSearch
} = customerSlice.actions;
export default customerSlice.reducer