export interface Order {
    id:              number;
    buyerId:         string;
    shippingAddress: ShippingAddress;
    orderDate:       string; //เปลี่ยนจาก Date เป็น string เพราะส่งมาเป็น json string 
    orderItems:      OrderItem[];
    subtotal:        number;
    deliveryFee:     number;
    orderStatus:     string;
    total:           number;
    voucher:         Voucher;
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

export interface Voucher {
    id:       number;
    name:     string;
    detail:   string;
    discount: number;
}
