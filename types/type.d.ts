declare interface User {
  _id?: string;
  firstName: string;
  lastName: string;
  number: string;
  email: string;
  cart: OrderItem[];
}

declare interface LoginForm {
  email: string;
  password: string;
}

declare interface RegistrationForm {
  firstName: string;
  lastName: string;
  number: string;
  email: string;
  password: string;
  confirmPassword: string;
}

declare interface Product {
  _id?: string;
  productName: string;
  productCategory: string;
  productBasePrice: number;
  productDescription: string;
  productImageUrl?: string;
}

declare interface OrderItem {
  productID: string;
  quantity: number;
  addOns: { name: string; price: number };
  itemSize: { name: string; price: number };
  sweetnessLevel: { name: string; price: number };
  itemTotalPrice: number;
}

declare interface OptionItem {
  name: string;
  price: number;
}
