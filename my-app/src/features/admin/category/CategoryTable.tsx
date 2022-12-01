import { Edit, Delete } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React, {useState } from 'react'
import agent from '../../../app/api/agent';
import useCategory from '../../../app/hooks/useCategory';
import { Category } from '../../../app/models/Category';
import { useAppDispatch, useAppSelector } from '../../../app/redux/configureStore';
import { removeCategory } from '../../category/categorySlice';
import AppPagination from '../../components/AppPagination';
import { setPageNumber } from '../../product/productSlice';
import CategoryFrom from './CategoryFrom';

export default function CategoryTable() {
    const {categorys,metaData} = useCategory();
    const dispatch = useAppDispatch();
    const [editMode, setEditMode] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Category | undefined>(
      undefined
    );
    const [loading, setLoading] = useState(false);
    const [target, setTarget] = useState(0);
   //กรณีเลือก Edit
   function handleSelectCategory(category: Category) {
    setSelectedCategory(category);
    setEditMode(true);
  }

  // const { category } = useAppSelector((state)=> state.category)

  function handleDeleteCategory(id: number) {
    setLoading(true);
    setTarget(id);
    agent.Admin.deleteCategory(id)
      .then(() => dispatch(removeCategory(id)))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }

  function cancelEdit() {
    if (selectedCategory) setSelectedCategory(undefined);
    setEditMode(false);
  }
  if (editMode)
  return <CategoryFrom category={selectedCategory} cancelEdit={cancelEdit} />;

    return (
    <>
    <Box display="flex" justifyContent="space-between">
      <Typography sx={{ p: 2 }} variant="h4">
        Category
      </Typography>
      <Button
          sx={{ m: 2 }}
          size="large"
          variant="contained"
          onClick={() => setEditMode(true)}
        >
          Create
        </Button>
    </Box>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell align="center">Type</TableCell>
            <TableCell align="center">Brand</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categorys.map((category) => (
            <TableRow
              key={category.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {category.id}
              </TableCell>
          
              <TableCell align="center">{category.type}</TableCell>
              <TableCell align="center">{category.brand}</TableCell>
              <TableCell align="right">
              <Button
                    startIcon={<Edit />}
                    onClick={() => handleSelectCategory(category)}
                  />
                  <LoadingButton
                    loading={loading && target === category.id}
                    startIcon={<Delete />}
                    color="error"
                    onClick={() => handleDeleteCategory(category.id)}
                  />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    {metaData && (
      <Box sx={{ pt: 2 }}>
        <AppPagination
          metaData={metaData}
          onPageChange={(page: number) =>
            dispatch(setPageNumber({ pageNumber: page }))
          }
        />
      </Box>
    )}
  </>
);
}
