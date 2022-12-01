import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Grid,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import agent from "../../app/api/agent";
import { Voucher } from "../../app/models/Voucher";

export default function Cardvoucher() {
  const [vouchers, setVouchers] = useState<Voucher[] | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    agent.Voucher.list()
      .then((vouchers) => setVouchers(vouchers))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  //#region slide
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  //#endregion
  return (
    <>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{mt:2}}>
        {vouchers?.map((voucher) => (
          <Grid item xs={6}>
            <Card>
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {voucher.name}
                </Typography>
                <Typography variant="h5" component="div">
                  {voucher.detail}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {voucher.discount}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
