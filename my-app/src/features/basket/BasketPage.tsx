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

export default function BasketPage() {
  //โหลดค่าตั้งต้นแล้วที่ App.tsx
  const dispatch = useAppDispatch();
  const { basket, status } = useAppSelector((state) => state.basket);

  const subtotal =
    basket?.items.reduce((sum, item) => sum + item.quantity * item.price, 0) ??
    0;
  const deliveryFee = subtotal > 10000 ? 0 : 500;

  if (!basket)
    return <Typography variant="h3">Your basket is empty</Typography>;

  return (
    <Paper sx={{ borderRadius: 5, mt: 5, mb: 2 }}>
      <Grid container spacing={2} columns={12}>
        <Grid item xs={4} sx={{ ml: 1,mt:2}}>
          <img
            src="https://i.pinimg.com/originals/6d/e5/94/6de5942efb633d70eacae532ab75e5cb.gif"
            width={400}
            height={670}
          />
        </Grid>
        <Grid item xs={7} sx={{mt:2,ml:2}}>
          <TableContainer>
            <Table sx={{ minWidth: 550 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="center">Quantity</TableCell>
                  <TableCell align="right">Subtotal</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {basket.items.map((item) => (
                  <TableRow
                    key={item.productId}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      <Box display="flex" alignItems="center">
                        <img
                          src={item.pictureUrl}
                          alt={item.name}
                          style={{ height: 80, marginRight: 5 }}
                        />
        
                        <span>{item.name}</span>
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      {(item.price / 100).toFixed(2)}
                    </TableCell>
                    <TableCell align="center">
                      <LoadingButton
                        loading={
                          status ===
                          "pendingRemoveItem" + item.productId + "rem"
                        }
                        onClick={() =>
                          dispatch(
                            removeBasketItemAsync({
                              productId: item.productId,
                              quantity: 1,
                              name: "rem",
                            })
                          )
                        }
                        color="error"
                      >
                        <Remove />
                      </LoadingButton>

                      {item.quantity}
                      <LoadingButton
                        loading={status === "pendingAddItem" + item.productId}
                        onClick={() =>
                          dispatch(
                            addBasketItemAsync({ productId: item.productId })
                          )
                        }
                        color="inherit"
                      >
                        <Add />
                      </LoadingButton>
                    </TableCell>
                    <TableCell align="right">
                      {((item.price * item.quantity) / 100).toFixed(2)}
                    </TableCell>
                    <TableCell align="right">
                      <LoadingButton
                        loading={status.includes(
                          "pendingRemoveItem" + item.productId + "del"
                        )}
                        onClick={() =>
                          dispatch(
                            removeBasketItemAsync({
                              productId: item.productId,
                              quantity: item.quantity,
                              name: "del",
                            })
                          )
                        }
                        color="error"
                      >
                        <Delete />
                      </LoadingButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={2}>Subtotal</TableCell>
                  <TableCell align="right">
                    {currencyFormat(subtotal)}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2}>Delivery fee*</TableCell>
                  <TableCell align="right">{deliveryFee}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2}>Total</TableCell>
                  <TableCell align="right">
                    {currencyFormat(subtotal + deliveryFee)}
                  </TableCell>
                </TableRow>
                <Button
                      component={Link}
                      to="/checkout"
                      variant="contained"
                      size="large"
                      fullWidth
                      sx={{ml:18,mt:1}}
                    >
                      Checkout
                    </Button>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Paper>
  );
}
