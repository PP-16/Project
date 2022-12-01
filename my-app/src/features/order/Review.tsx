import * as React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import BasketTable from "../basket/BasketTable";
import BasketSummary from "../basket/BasketSummary";
import { useAppSelector } from "../../app/redux/configureStore";
import {
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TextField,
} from "@mui/material";
import { currencyFormat } from "../../app/util/util";
import { useFormContext } from "react-hook-form";
import AppTextInput from "../components/AppTextInput";
import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import { Orders } from "../../app/models/Orders";
import AppCheckbox from "../components/AppCheckbox";

export default function Review() {
  const { basket } = useAppSelector((state) => state.basket);
  const { control } = useFormContext();
  const subtotal =
    basket?.items.reduce((sum, item) => sum + item.quantity * item.price, 0) ??
    0;
  const deliveryFee = subtotal > 10000 ? 0 : 500;

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      {basket && <BasketTable items={basket.items} isBasket={false} />}
      <Grid container>
        <Grid item xs={6} />
        <Grid item xs={6}>
          <TableContainer component={Paper} variant={"outlined"}>
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
                <TableRow>
                  <TableCell>
                    <span style={{ fontStyle: "italic" }}>
                      *Orders over $100 qualify for free delivery
                    </span>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Grid item xs={6}>
            <AppTextInput control={control} name="voucher" label="voucher" />
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
