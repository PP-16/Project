export interface ImageProduct {
    id:        number;
    productId: number;
    product:   Product;
    image:     string;
    image2:    string;
    image3:    string;
    image4:    string;
}

export interface Product {
    id:              number;
    name:            string;
    imageUrl:        string;
    description:     string;
    price:           number;
    quantityInStock: number;
    categoryId:      number;
    category:        Category;
}

export interface Category {
    id:    number;
    brand: string;
    type:  string;
}
