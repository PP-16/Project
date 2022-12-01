import React, { useEffect } from "react";
import { Category } from "../../../app/models/Category";
import { FieldValues, useForm } from "react-hook-form";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import AppTextInput from "../../components/AppTextInput";
import { useAppDispatch } from "../../../app/redux/configureStore";
import agent from "../../../app/api/agent";
import { setCategory } from "../../category/categorySlice";
import { LoadingButton } from "@mui/lab";

interface Props {
  category?: Category;
  cancelEdit: () => void;
}

export default function CategoryFrom({ category, cancelEdit }: Props) {
    const { control, reset, handleSubmit, formState: {isDirty,isSubmitting } } = useForm();
    const dispatch = useAppDispatch();
    // useEffect(() => {
    //     if (category && !isDirty) reset(category);  
    //   }, [category, reset, isDirty]);
      
  async function handleSubmitData(data: FieldValues) {
    try {
      let response: Category;
      if (category) {
        response = await agent.Admin.updateCategory(data);
      } else {
        response = await agent.Admin.createCategory(data);
      }
      dispatch(setCategory(response));
      cancelEdit();
    } catch (error) {
      console.log(error);
    }
}
  

  return (
    <Box component={Paper} sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Category Details
      </Typography>
      <form onSubmit={handleSubmit(handleSubmitData)}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <AppTextInput control={control} name="brand" label="brand" />
          </Grid>
          <Grid item xs={12} sm={12}>
            <AppTextInput control={control} name="type" label="type" />
          </Grid>
        </Grid>
        <Box display="flex" justifyContent="space-between" sx={{ mt: 3 }}>
        <Button variant="contained" color="inherit" onClick={cancelEdit}>
            Cancel
          </Button>
          <LoadingButton
            loading={isSubmitting}
            variant="contained"
            color="success"
            type="submit"
          >
            Submit
          </LoadingButton>
        </Box>
      </form>
    </Box>
  );
}
