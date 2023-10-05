interface Product {
  _id: string;
  name: string;
  price: number;
  imageLink: string;
  createdOn: string;
  updatedOn: string;
  status: string;
  productOwnerID: string;
}

export interface ApiResponse {
  pagesCount: number;
  results: Product[];
  count: number;
}
