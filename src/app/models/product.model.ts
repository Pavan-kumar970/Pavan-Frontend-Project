export interface Product {
    _id?: string;  // Optional for new products
    name: string;
    description: string;
    price: number;
    category: string;
    stock: number;
    image: string;
  }
  