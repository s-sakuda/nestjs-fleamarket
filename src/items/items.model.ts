export interface Item {
  id: string;
  name: string;
  price: number;
  description?: string;
  status: 'NO_SALE' | 'SOLD_OUT';
}
