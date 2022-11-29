import { Add, Delete, Remove } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import agent from "../../app/api/agent";
import { useAppDispatch, useAppSelector } from "../../app/redux/configureStore";
import { currencyFormat } from "../../app/util/util";
import {
  addBasketItemAsync,
  removeBasketItemAsync,
  setBasket,
} from "./basketSlice";
import BasketSummary from "./BasketSummary";
import BasketTable from "./BasketTable";

export default function BasketPage() {
  const { basket } = useAppSelector((state) => state.basket);

  if (!basket)
    return <Typography variant="h3">Your basket is empty</Typography>;



  return (
    <Paper sx={{ borderRadius: 5, mt: 5, mb: 2 }}>

      <Grid container spacing={2} columns={12}>
        <Grid item xs={4} sx={{ ml: 1,mt:2}}>
          <img
            src="https://i.pinimg.com/originals/6d/e5/94/6de5942efb633d70eacae532ab75e5cb.gif"
            width={500}
            height={670}
          />
        </Grid>
        <Grid item xs={7} sx={{mt:2,ml:6}}>
        <BasketTable items={basket.items} isBasket={true} />
        <BasketSummary />
        <Button
            component={Link}
            to="/checkout"
            variant="contained"
            size="large"
            fullWidth
          >
            Checkout
          </Button>

        </Grid>
      </Grid>
    </Paper>
  );
}
