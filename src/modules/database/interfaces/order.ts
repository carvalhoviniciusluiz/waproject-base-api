export interface IOrder {
  id?: number;
  userId?: number;
  description: string;
  quantity: number;
  price: number;
  createdDate?: Date;
  updatedDate?: Date;
}
