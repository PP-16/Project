import { Grid, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import useProducts from "../../app/hooks/useProducts";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Product } from "../../app/models/Product";
import { useAppDispatch, useAppSelector } from "../../app/redux/configureStore";
import AppPagination from "../components/AppPagination";
import CheckboxButtons from "../components/CheckboxButtons";
import RadioButtonGroup from "../components/RadioButtonGroup";
import ProductList from "./ProductList";
import { fetchFilters, fetchProductsAsync, productSelectors, setPageNumber, setProductParams } from "./productSlice";

const sortOptions = [
  { value: "name", label: "Alphabetical" },
  { value: "priceDesc", label: "Price - High to low" },
  { value: "price", label: "Price - Low to high" },
];


export default function Catalog() {
  const { products, brands, types, filtersLoaded, metaData } = useProducts();
  const { productParams } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();

  if (!filtersLoaded) return <LoadingComponent message="Loading Products..." />;

  return (
    <Grid container columnSpacing={4}>
    <Grid item xs={3}>
      <Paper sx={{ mb: 2 }}>
             Search products
      </Paper>
      <Paper sx={{ mb: 2, p: 2 }}>
      <RadioButtonGroup
            selectedValue={productParams.orderBy}
            options={sortOptions}
            onChange={(e) =>
              dispatch(setProductParams({ orderBy: e.target.value }))
            }
          />
      </Paper>
      <Paper sx={{ mb: 2, p: 2 }}>
      <CheckboxButtons
            items={brands}
            checked={productParams.brands}
            onChange={(items: string[]) =>
              dispatch(setProductParams({ brands: items }))
            }
          />

      </Paper>
      <Paper sx={{ mb: 2, p: 2 }}>
      <CheckboxButtons
            items={types}
            checked={productParams.types}
            onChange={(items: string[]) =>
              dispatch(setProductParams({ types: items }))
            }
          />

      </Paper>
    </Grid>
    <Grid item xs={9}>
      <ProductList products={products} />
    </Grid>
    <Grid item xs={3} />
    <Grid item xs={9} sx={{ mb: 2,mt: 2 }}>
    {metaData && (
          <AppPagination
            metaData={metaData}
            onPageChange={(page: number) =>
              dispatch(setPageNumber({ pageNumber: page }))
            }
          />
        )}  

    </Grid>
  </Grid>

  );
}
