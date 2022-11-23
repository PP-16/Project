import { Button, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../redux/configureStore";
import { decrement, increment } from "../redux/counterSlice";

export default function ContactPage() {
    //เรียกมาจาก configureStore.ts
    const dispatch = useAppDispatch()
    const {data,title} =  useAppSelector(state => state.counter)
  
    return (
      <>
      <Typography variant="h2">
        {title} {data}
      </Typography>
      <Button sx={{m:2}} variant='contained' onClick={()=>dispatch(increment(1))}>+</Button>
      <Button variant='contained' onClick={()=>dispatch(decrement(1))}>-</Button>
      {/* <Button sx={{m:2}} variant='contained' onClick={()=>dispatch(increment(5))}>+5</Button> */}
      </>
    );
  }
  