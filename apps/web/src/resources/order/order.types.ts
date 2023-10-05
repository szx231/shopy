export interface Order {
  _id: string;
  name: string;
  price: number;
  imageLink: string;
  createdOn: string;
  updatedOn: string;
  status: string;
  orderTime: string;
  productOwnerID: string;
}

export interface ResponseTypes {
  pagesCount: number;
  results: Order[];
  count: number;
}
