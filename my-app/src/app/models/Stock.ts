export interface Stock {
    id:         number;
    quantity:   number;
    totalPrice: number;
    productId:  number;
    product:    Product;
    senderId:   number;
    sender:     Sender;
    categoryId: number;
    category:   Category;
    orderDate:  Date;
}

export interface Category {
    id:    number;
    brand: string;
    type:  string;
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

export interface Sender {
    id:         number;
    name:       string;
    tellNumber: number;
    address:    string;
}
