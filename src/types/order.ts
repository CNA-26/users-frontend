export interface OrderItem {
  productId: string;
  name: string;
  imageUrl: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  createdAt: string;
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: OrderItem[];
}
