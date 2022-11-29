import { LoadingButton } from "@mui/lab";
import { Container, Grid, Paper, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../app/models/Product";
import axios from "axios";
import Slider from "react-slick";
import { useStoreContext } from "../../app/contact/StoreContext";
import agent from "../../app/api/agent";
import { addBasketItemAsync, removeBasketItemAsync } from "../basket/basketSlice";
import { useAppDispatch, useAppSelector } from "../../app/redux/configureStore";
import { fetchProductAsync, productSelectors } from "./productSlice";
import LoadingComponent from "../../app/layout/LoadingComponent";
import NotFound from "../../app/layout/NotFound";


export default function ProductDetails() {
//#region basket
const { id } = useParams<{ id: any }>(); //อ่านค่าจากพารามิเตอร์ที่ส่งมาตามพาท (URL Parameters)
const product = useAppSelector(state => productSelectors.selectById(state, id));
const {status: productStatus} = useAppSelector(state => state.product);


const dispatch = useAppDispatch();
  const { basket, status } = useAppSelector((state) => state.basket);
  const [quantity, setQuantity] = useState(0);
  const item = basket?.items.find((i) => i.productId === product?.id);

  useEffect(() => {
    if (item) setQuantity(item.quantity);

    if (!product) dispatch(fetchProductAsync(parseInt(id)))
  }, [id,item,dispatch,product]);



function handleInputChange(event: any) {
  if (event.target.value >= 0) {
    setQuantity(parseInt(event.target.value));
  }
}

function handleUpdateCart() {
  if (!item || quantity > item.quantity) {
    const updatedQuantity = item ? quantity - item.quantity : quantity;
    dispatch(
      addBasketItemAsync({
        productId: product?.id!,
        quantity: updatedQuantity,
      })
    );
  } else {
    const updatedQuantity = item.quantity - quantity;
    dispatch(
      removeBasketItemAsync({
        productId: product?.id!,
        quantity: updatedQuantity,
      })
    );
  }
}


//#endregion

if (productStatus.includes('pending')) return <LoadingComponent message="Loading Products....." />;

if (!product) return <NotFound />;


  //#region slide
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  //#endregion
  return (
    <>
      <Paper elevation={3} sx={{ borderRadius: 8 , width :1200, height:450,ml:10 }}>
        <Grid container sx={{ mt: 5 }}>
          <Grid item xs={6} sx={{borderRadius:10,mt:6}}>
            <Container>
            <Slider {...settings}>
              <img
                src={"https://i.pinimg.com/564x/3b/12/1d/3b121d29a6ecf7de93e59b8e1efe214f.jpg"}
                 width = "550" height= "350" 
              />

              <img 
                src={product.imageUrl}
                width = "550" height= "350" 
              />

              <img
                src={product.imageUrl}
                width = "550" height= "350" 
              />

              <img
                src={product.imageUrl}
                width = "550" height= "350" 
              />
            </Slider>
            </Container>
          </Grid>
          <Grid item xs={6}>
            <Container  sx={{mt:4}}>
            <Typography variant="h1">{product.name}</Typography>
            <Typography variant="h3">
              ${(product.price / 100).toFixed(2)}
            </Typography>
            <Typography variant="h4">{product.description}</Typography>
            <Typography variant="h4" color="text.secondary">
              {product.category.brand} / {product.category.type}
            </Typography>
            <Typography variant="h3">{product.quantityInStock}</Typography>
            <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              variant="outlined"
              type="number"
              label="Quantity in Cart"
              // fullWidth
              value={quantity}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <LoadingButton
              disabled={
                item?.quantity === quantity || (!item && quantity === 0)
              }
              loading={status.includes("pending")}
              onClick={handleUpdateCart}
              sx={{ height: "55px" }}
              color="primary"
              size="medium"
              variant="contained"
              fullWidth
            >
              {item ? "Update Quantity" : "Add to Cart"}
            </LoadingButton>
          </Grid>
        </Grid>

            </Container>
          </Grid>
        </Grid>
      </Paper>
      <Paper elevation={3} sx={{ borderRadius: 8 , width :1200, height:450,ml:10 }}>
        <Grid container sx={{ mt: 5 }}>
          <Grid item xs={6} sx={{mt:6}}>
            <Container sx={{borderRadius:10}}>
            <Slider {...settings}>
              <img
                src={"https://i.pinimg.com/564x/3b/12/1d/3b121d29a6ecf7de93e59b8e1efe214f.jpg"}
                 width = "550" height= "350" 
              />

              <img 
                src={product.imageUrl}
                width = "550" height= "350" 
              />

              <img
                src={product.imageUrl}
                width = "550" height= "350" 
              />

              <img
                src={product.imageUrl}
                width = "550" height= "350" 
              />
            </Slider>
            </Container>
          </Grid>
          <Grid item xs={6}>
            <Container  sx={{ml:5,mt:4}}>
            <Typography variant="h1">{product.name}</Typography>
            <Typography variant="h3">
              ${(product.price / 100).toFixed(2)}
            </Typography>
            <Typography variant="h4">{product.description}</Typography>
            <Typography variant="h4" color="text.secondary">
              {product.category.brand} / {product.category.type}
            </Typography>
            <Typography variant="h3">{product.quantityInStock}</Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                {/* <TextField
              variant="outlined"
              type="number"
              label="Quantity in Cart"
              fullWidth
              value={quantity}
              onChange={handleInputChange}
            /> */}
              </Grid>
              <Grid item xs={6}>
                {/* <LoadingButton
            disabled={
              item?.quantity === quantity || (!item && quantity === 0)
            }
            loading={status.includes("pending")}
            onClick={handleUpdateCart}
            sx={{ height: "55px" }}
            color="primary"
            size="large"
            variant="contained"
            fullWidth
          >
            {item ? "Update Quantity" : "Add to Cart"}
          </LoadingButton> */}
              </Grid>
            </Grid>
            </Container>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
