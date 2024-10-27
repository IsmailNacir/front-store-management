export interface Product {
  id: string;
  name: string;
  price: number;
}

export interface PageProduct {
  products: Product[];
  page: number;
  size: number;
  totalPage: number;
}
