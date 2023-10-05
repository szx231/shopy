export interface Basket {
  _id: string;
  name: string;
  price: number;
  imageLink: string;
  createdOn: string;
  updatedOn: string;
  status: string;
  productOwnerID: string;
  quantity: number;
}

export interface ResponseTypes {
  productsCount: number;
  pagesCount: number;
  results: Basket[];
  count: number;
}
