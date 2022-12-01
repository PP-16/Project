import React, { useEffect } from "react";
import {
  fetchFilters,
  fetchProductsAsync,
  productSelectors,
} from "../../features/product/productSlice";
import { useAppDispatch, useAppSelector } from "../redux/configureStore";

export default function useProducts() {
  const products = useAppSelector(productSelectors.selectAll);
  const { productsLoaded, filtersLoaded, brands, types, metaData } =
    useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();

  //แยก useEffect เพื่อป้องกันการโหลดซ้ำซ้อนจาก [] (ตรวจสอบจาก Redux dev tools)
  useEffect(() => {
    if (!productsLoaded) dispatch(fetchProductsAsync());
  }, [productsLoaded, dispatch]);

  useEffect(() => {
    if (!filtersLoaded) dispatch(fetchFilters());
  }, [filtersLoaded, dispatch]);

  return {
    products,
    productsLoaded,
    filtersLoaded,
    brands,
    types,
    metaData,
  };
}
