import { Button, Typography } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CounterState, decrement, increment } from './counterReducer'

export default function CounterPage() {
    const dispatch = useDispatch()
    const {data,title} =  useSelector((state:CounterState)=>state)
   
  
  return (
    <>
    <Typography variant="h2">
      {title} {data}
    </Typography>
    <Button sx={{m:2}} variant='contained' onClick={()=>dispatch(increment(1))}>+</Button>
    <Button variant='contained' onClick={()=>dispatch(decrement(1))}>-</Button>
    {/* <Button sx={{m:2}} variant='contained' onClick={()=>dispatch(increment(5))}>+5</Button> */}
    </>

  )
}
