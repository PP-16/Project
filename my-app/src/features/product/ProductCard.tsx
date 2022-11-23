import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  CardHeader,
  Box,
} from "@mui/material";
import { red } from "@mui/material/colors";
import { Link } from "react-router-dom";
import { Product } from "../../app/models/Product";

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  return (
    <Card sx={{ display: "flex", width: 500, height: 250 }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            {product.name}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {(product.price / 100).toFixed(2)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {product.category.brand} / {product.category.type}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">ADD TO CART</Button>
          <Button component={Link} to={`/product/${product.id}`} size="small">
            VIEW
          </Button>
        </CardActions>
      </Box>
      <CardMedia component="img" sx={{ width: 300 }} image={product.imageUrl} />
    </Card>
  );
}
