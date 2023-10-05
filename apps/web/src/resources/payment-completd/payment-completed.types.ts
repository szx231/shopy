interface Product {
  _id: string;
  name: string;
  price: number;
  imageLink: string;
  createdOn: string;
  updatedOn: string;
  status: string;
  productOwnerID: string;
  inBasket: boolean;
}

export interface ProductResponse {
  pagesCount: number;
  results: Product[];
  count: number;
}
