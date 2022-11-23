import { LoadingButton } from "@mui/lab";
import { Container, Grid, Paper, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../app/models/Product";
import axios from "axios";
import Slider from "react-slick";


export default function ProductDetails() {
  const { id } = useParams(); //อ่านค่าจากพารามิเตอร์ที่ส่งมาตามพาท (URL Parameters)
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/product/${id}`)
      .then((respons) => setProduct(respons.data))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <h3>Loading....</h3>;

  if (!product) return <h3>Product not found</h3>;

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
      <Paper elevation={3} sx={{ borderRadius: 8 , width :1200, height:450 }}>
        <Grid container sx={{ mt: 5 }}>
          <Grid item xs={6} sx={{borderRadius:10,mt:2}}>
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
            <Container>
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
