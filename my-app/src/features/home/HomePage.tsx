import { Container, Grid } from "@mui/material";
import { useState } from "react";
import Slider from "react-slick";
import { Voucher } from "../../app/models/Voucher";
import Cardvoucher from "../voucher/Cardvoucher";

export default function HomePage() {

  const [vouchers, setVouchers] = useState<Voucher>();

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    autoplay: true,
    speed: 1500,
    autoplaySpeed: 950,
    cssEase: "linear"
  };
  return (
    <Container>
      <Slider {...settings}>
        <div>
          <img src="https://i.pinimg.com/originals/26/bb/4f/26bb4f08d445790b80e7a1d90dfb65ab.gif" width={1500} height={450}/>
        </div>
        <div>
        <img src="https://i.pinimg.com/564x/b1/17/a1/b117a165958954eec4a1260e18473eda.jpg"  width={1500} height={450}/>
        </div>
        <div>
        <img src="https://i.pinimg.com/564x/06/c0/57/06c0575a0f0d31d109907ff798788768.jpg" width={1500} height={450}/>
        </div>
        <div>
        <img src="https://i.pinimg.com/564x/b3/3b/b3/b33bb39533da2b2429f1433d6ce29931.jpg" width={1500} height={450}/>
        </div>
        <div>
        <img src="https://i.pinimg.com/564x/be/77/19/be771932abe50fc2f7a58b89ef0e3ed9.jpg"  width={1500} height={450}/>
        </div>
        <div>
        <img src="https://i.pinimg.com/564x/2f/60/bd/2f60bdc22f28a9ec83d393d35f0a1c9b.jpg" width={1500} height={450}/>
        </div>
      </Slider>

        <Cardvoucher/>
    </Container>
  )
}