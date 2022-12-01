import React, { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../redux/configureStore";
import {
  categorySelectors,
  fetchCategorysAsync,
  fetchFilters,
} from "../../features/category/categorySlice";

export default function useCategory() {
  const categorys = useAppSelector(categorySelectors.selectAll);
  const { categoryLoaded, metaData } = useAppSelector((state) => state.category);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!categoryLoaded) dispatch(fetchCategorysAsync());
  }, [categoryLoaded, dispatch]);


  return{
    categorys,
    categoryLoaded,
    metaData

  }
}
