import { LoadingButton } from "@mui/lab";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  CardHeader,
  Box,
} from "@mui/material";
import { red } from "@mui/material/colors";
import { useState } from "react";
import { Link } from "react-router-dom";
import agent from "../../app/api/agent";
import { useStoreContext } from "../../app/contact/StoreContext";
import { Product } from "../../app/models/Product";
import { useAppDispatch, useAppSelector } from "../../app/redux/configureStore";
import { addBasketItemAsync, setBasket } from "../basket/basketSlice";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const { status } = useAppSelector((state) => state.basket);
  const dispatch =  useAppDispatch()


  return (
    <Card sx={{ display: "flex", width: 500, height: 250,borderRadius:5 }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            {product.name}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {(product.price / 100).toFixed(2)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.category.brand} / {product.category.type}
          </Typography>
        </CardContent>
        <CardActions>
        <LoadingButton
          loading={status.includes("pendingAddItem" + product.id)} //includes('pending') ข้อความที่ต้องการค้นหาหรือเปรียบเทียบ
          onClick={() =>
            dispatch(addBasketItemAsync({ productId: product.id }))
          }
          size="small"
        >
          Add to cart
        </LoadingButton>


          <Button component={Link} to={`/product/${product.id}`} size="small">
            VIEW
          </Button>
        </CardActions>
      </Box>
      <CardMedia component="img" sx={{ width: 300,borderRadius:3 }} image={product.imageUrl} />
    </Card>
  );
}
