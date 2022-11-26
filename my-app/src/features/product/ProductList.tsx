import { Grid } from "@mui/material";
import { Product } from "../../app/models/Product";
import { useAppSelector } from "../../app/redux/configureStore";
import ProductCardSkeleton from "../components/ProductCardSkeleton";
import ProductCard from "./ProductCard";

interface Props {
  products: Product[];
}

export default function ProductList({ products }: Props) {
  const { productsLoaded } = useAppSelector((state) => state.product);

  return (
    <div>
      <Grid container spacing={4}>
        {products.map((product) => (
          <Grid item xs={6} key={product.id}>
            {!productsLoaded ? (
              <ProductCardSkeleton />
            ) : (
              <ProductCard product={product} />
            )}
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
