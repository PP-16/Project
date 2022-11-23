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