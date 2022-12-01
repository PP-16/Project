import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { accountSlice } from '../../features/account/accountSlice';
import { basketSlice } from '../../features/basket/basketSlice';
import { categorySlice } from '../../features/category/categorySlice';
import { homeSlice } from '../../features/home/homeSlice';
import { productSlice } from '../../features/product/productSlice';
import { counterSlice } from './counterSlice';

//configureStore เป็นของ redux toolkits ทำหน้าที่รวบรวม Slice/Reducer
export const store = configureStore({
    reducer:{
        counter : counterSlice.reducer,
        basket: basketSlice.reducer,
        product : productSlice.reducer,
        account: accountSlice.reducer,
        screen: homeSlice.reducer,
        category : categorySlice.reducer,
    }
})

//เป็นค่า Default ที่มีอยู่ใน store คือ store.getState, store.dispatch (ใช้ตามรูปแบบเขาเลย)
export type RootState = ReturnType<typeof store.getState>	// ค่าของ state ทั้งหมด
export type AppDispatch = typeof store.dispatch;			// dispatch สำหรับเรียก action

//สำหรับเรียกใข้ dispatch และ state (ใช้ตามรูปแบบเขาเลย)
export const useAppDispatch = ()=>useDispatch<AppDispatch>()
export const useAppSelector : TypedUseSelectorHook<RootState> = useSelector

