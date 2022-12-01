export interface Orders {
    id:              number;
    buyerId:         string;
    shippingAddress: ShippingAddress;
    orderDate:       string;
    orderItems:      OrderItem[];
    subtotal:        number;
    deliveryFee:     number;
    orderStatus:     string;
    total:           number;
    voucher:         string;
}

export interface OrderItem {
    productId:  number;
    name:       string;
    pictureUrl: string;
    price:      number;
    quantity:   number;
}

export interface ShippingAddress {
    fullName: string;
    address1: string;
    address2: string;
    city:     string;
    state:    string;
    zip:      string;
    country:  string;
}
