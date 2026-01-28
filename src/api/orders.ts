import { Order } from '../types/order';

// Mock data for development
const mockOrders: Order[] = [
  {
    id: '12345',
    createdAt: '2024-01-15',
    status: 'delivered',
    total: 89.99,
    items: [
      {
        productId: '1',
        name: 'Wireless Headphones',
        imageUrl: 'https://via.placeholder.com/100?text=Headphones',
        quantity: 1,
        price: 79.99
      },
      {
        productId: '2',
        name: 'USB Cable',
        imageUrl: 'https://via.placeholder.com/100?text=Cable',
        quantity: 2,
        price: 5.00
      }
    ]
  },
  {
    id: '12346',
    createdAt: '2024-01-20',
    status: 'shipped',
    total: 149.50,
    items: [
      {
        productId: '3',
        name: 'Phone Case',
        imageUrl: 'https://via.placeholder.com/100?text=Case',
        quantity: 1,
        price: 29.99
      },
      {
        productId: '4',
        name: 'Screen Protector',
        imageUrl: 'https://via.placeholder.com/100?text=Protector',
        quantity: 3,
        price: 9.99
      },
      {
        productId: '5',
        name: 'Charging Cable',
        imageUrl: 'https://via.placeholder.com/100?text=Charger',
        quantity: 2,
        price: 15.00
      }
    ]
  },
  {
    id: '12347',
    createdAt: '2024-01-25',
    status: 'pending',
    total: 299.99,
    items: [
      {
        productId: '6',
        name: 'Mechanical Keyboard',
        imageUrl: 'https://via.placeholder.com/100?text=Keyboard',
        quantity: 1,
        price: 199.99
      },
      {
        productId: '7',
        name: 'Mouse Pad',
        imageUrl: 'https://via.placeholder.com/100?text=Mousepad',
        quantity: 1,
        price: 19.99
      },
      {
        productId: '8',
        name: 'Desk Lamp',
        imageUrl: 'https://via.placeholder.com/100?text=Lamp',
        quantity: 1,
        price: 80.01
      }
    ]
  }
];

export async function fetchOrders(): Promise<Order[]> {
  // For now, return mock data immediately
  // In production, this would fetch from your backend
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockOrders), 500); // Simulate network delay
  });
}

export async function fetchOrderById(orderId: string): Promise<Order> {
  const order = mockOrders.find(o => o.id === orderId);
  if (!order) {
    throw new Error('Order not found');
  }
  return new Promise((resolve) => {
    setTimeout(() => resolve(order), 300);
  });
}
