import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import agent from "../../app/api/agent";
import { Category } from "../../app/models/Category";
import { RootState } from "../../app/redux/configureStore";
import { MetaData } from "../components/pagination";

interface CatalogState {
    categoryLoaded: boolean;
    filtersLoaded: boolean;
    status: string;
    metaData: MetaData | null;
}

const categoryAdapter = createEntityAdapter<Category>();

//createAsyncThunk<return, input, ThunkAPI parameter>
export const fetchCategorysAsync = createAsyncThunk<Category[], void, { state: RootState }>(
    'category/fetchCategorysAsync',
    async (_, thunkAPI) => {
        try {
            const response = await agent.Category.list();
            thunkAPI.dispatch(setMetaData(response.metaData)); //วิธีเรียก action ภายในตัวเอง
            return response.items
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data }) //ส่งไปที่ Interceptor
        }
    }
)


export const fetchCategoryAsync = createAsyncThunk<Category, number>(
    'category/fetchCategoryAsync',
    async (categoryId, thunkAPI) => {
        try {
            return await agent.Category.fetch(categoryId);
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data }) //ส่งไปที่ Interceptor
        }
    }
)

//thunkAPI ดักจับ error จาก Axios Interceptor
export const fetchFilters = createAsyncThunk(
    'category/fetchFilters',
    async (_, thunkAPI) => {
        try {
            return agent.Category.fetchFilters();
            //return ไปให้ fetchProductAsync.fulfilled, (state, action) =>{ }
        } catch (error: any) {
            return thunkAPI.rejectWithValue({ error: error.data })
        }
    }
)

export const categorySlice = createSlice({
    name: 'category',
    initialState: categoryAdapter.getInitialState<CatalogState>({
        categoryLoaded: false,
        status: 'idle',
        filtersLoaded: false,
        metaData: null,
    }),
    reducers: {
        setMetaData: (state, action) => {
            state.metaData = action.payload;
        },
        setCategory: (state, action) => {
            categoryAdapter.upsertOne(state, action.payload);
            state.categoryLoaded = false;
        },
        removeCategory: (state, action) => {
            categoryAdapter.removeOne(state, action.payload); //มีไว้ทำอะไร
            state.categoryLoaded = false; //state เปลี่ยนไปทำการโหลดข้อมูลมาใหม่ที่ useProduct.tsx
        }
    },
    extraReducers: (builder => {
        builder.addCase(fetchCategorysAsync.pending, (state) => {
            state.status = 'pendingFetchCategorys';
        });
        builder.addCase(fetchCategorysAsync.fulfilled, (state, action) => {
            categoryAdapter.setAll(state, action.payload);
            state.status = 'idle';
            state.categoryLoaded = true;
        });
        builder.addCase(fetchCategorysAsync.rejected, (state, action) => {
            console.log(action.payload)
            state.status = 'idle';
        });
        builder.addCase(fetchCategoryAsync.pending, (state) => {
            state.status = 'pendingFetchProduct';
        });
        builder.addCase(fetchCategoryAsync.fulfilled, (state, action) => {
            categoryAdapter.upsertOne(state, action.payload);
            state.status = 'idle';
        });
        builder.addCase(fetchCategoryAsync.rejected, (state, action) => {
            console.log(action.payload)
            state.status = 'idle';
        });
        builder.addCase(fetchFilters.pending, (state) => {
            state.status = 'pendingFetchFilters';
        });
        builder.addCase(fetchFilters.fulfilled, (state, action) => {
            state.filtersLoaded = true;
            state.status = 'idle';
        });
        builder.addCase(fetchFilters.rejected, (state, action) => {
            state.status = 'idle';
            console.log(action.payload);
        });
    })

})

export const categorySelectors = categoryAdapter.getSelectors((state: RootState) => state.category); 

export const {setCategory,removeCategory,setMetaData} = categorySlice.actions;


