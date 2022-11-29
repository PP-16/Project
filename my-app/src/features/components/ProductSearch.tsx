import { debounce, TextField } from "@mui/material";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/redux/configureStore";
import { setProductParams } from "../product/productSlice";

export default function ProductSearch() {
    const { productParams } = useAppSelector((state) => state.product);
    const [searchTerm, setSearchTerm] = useState(productParams.searchTerm);
    const dispatch = useAppDispatch();
  
    //หน่วงเวลารอให้พิมพ์ข้อความ
    const debouncedSearch = debounce((event: any) => {
      dispatch(setProductParams({ searchTerm: event.target.value }));
    }, 1000);
  
    return (
      <TextField
        value={searchTerm || ""}
        onChange={(event: any) => {
          setSearchTerm(event.target.value);
          debouncedSearch(event);
        }}
      />
    );
  }
  