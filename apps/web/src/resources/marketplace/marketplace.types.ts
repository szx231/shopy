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

export interface Filters {
  page: number;
  sortBy: string;
  fromPrice: number;
  toPrice: number;
  searchValue: string;
}
