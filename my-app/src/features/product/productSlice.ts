import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import agent from "../../app/api/agent";
import { Product, ProductParams } from "../../app/models/Product";
import { RootState } from "../../app/redux/configureStore";
import { MetaData } from "./components/pagination";

interface CatalogState {
    productsLoaded: boolean;
    filtersLoaded: boolean;
    status: string;
    brands: string[];
    types: string[];
    productParams: ProductParams;
    metaData: MetaData | null;
}

const productsAdapter = createEntityAdapter<Product>();

function getAxiosParams(productParams: ProductParams) {
    const params = new URLSearchParams();
    params.append('pageNumber', productParams.pageNumber.toString());
    params.append('pageSize', productParams.pageSize.toString());
    params.append('orderBy', productParams.orderBy);
    if (productParams.searchTerm) params.append('searchTerm', productParams.searchTerm);
    if (productParams.brands.length > 0) params.append('brands', productParams.brands.toString());
    if (productParams.types.length > 0) params.append('types', productParams.types.toString());
    return params;
}

//createAsyncThunk<return, input, ThunkAPI parameter>
export const fetchProductsAsync = createAsyncThunk<Product[], void, { state: RootState }>(
    'product/fetchProductsAsync',
    async (_, thunkAPI) => {
        const params = getAxiosParams(thunkAPI.getState().product.productParams);
        try {
            const response = await agent.Products.list(params);
            thunkAPI.dispatch(setMetaData(response.metaData)); //วิธีเรียก action ภายในตัวเอง
            return response.items
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data }) //ส่งไปที่ Interceptor
        }
    }
)


export const fetchProductAsync = createAsyncThunk<Product, number>(
    'product/fetchProductAsync',
    async (productId, thunkAPI) => {
        try {
            return await agent.Products.details(productId);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data }) //ส่งไปที่ Interceptor
        }
    }
)

//thunkAPI ดักจับ error จาก Axios Interceptor
export const fetchFilters = createAsyncThunk(
    'product/fetchFilters',
    async (_, thunkAPI) => {
        try {
            return agent.Products.fetchFilters();
            //return ไปให้ fetchProductAsync.fulfilled, (state, action) =>{ }
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
)

// brands: [],types: [] เก็บค่าที่ถูกเลือก สำหรับส่งไปให้ฝั่ง API
function initParams(): ProductParams {
    return {
        pageNumber: 1,
        pageSize: 6,
        orderBy: 'name',
        brands: [],
        types: [],

    }
}

export const productSlice = createSlice({
    name: 'product',
    initialState: productsAdapter.getInitialState<CatalogState>({
        productsLoaded: false,
        status: 'idle',
        filtersLoaded: false,
        brands: [],
        types: [],
        productParams: initParams(),
        metaData: null
    }),
    reducers: {
        setProductParams: (state, action) => {
            state.productsLoaded = false;
            state.productParams = {...state.productParams, ...action.payload, pageNumber: 1};
        },
        resetProductParams: (state) => {
            state.productParams = initParams();
        },
        setMetaData: (state, action) => {
            state.metaData = action.payload;
        },

    },
    extraReducers: (builder => {
        builder.addCase(fetchProductsAsync.pending, (state) => {
            state.status = 'pendingFetchProducts';
        });
        builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
            productsAdapter.setAll(state, action.payload);
            state.status = 'idle';
            state.productsLoaded = true;
        });
        builder.addCase(fetchProductsAsync.rejected, (state, action) => {
            console.log(action.payload)
            state.status = 'idle';
        });
        builder.addCase(fetchProductAsync.pending, (state) => {
            state.status = 'pendingFetchProduct';
        });
        builder.addCase(fetchProductAsync.fulfilled, (state, action) => {
            productsAdapter.upsertOne(state, action.payload);
            state.status = 'idle';
        });
        builder.addCase(fetchProductAsync.rejected, (state, action) => {
            console.log(action.payload)
            state.status = 'idle';
        });
        builder.addCase(fetchFilters.pending, (state) => {
            state.status = 'pendingFetchFilters';
        });
        builder.addCase(fetchFilters.fulfilled, (state, action) => {
            state.brands = action.payload.brands;
            state.types = action.payload.types;
            state.filtersLoaded = true;
            state.status = 'idle';
        });
        builder.addCase(fetchFilters.rejected, (state, action) => {
            state.status = 'idle';
            console.log(action.payload);
        });
    })

})

export const productSelectors = productsAdapter.getSelectors((state: RootState) => state.product); 

export const {setProductParams, resetProductParams,setMetaData } = productSlice.actions;


