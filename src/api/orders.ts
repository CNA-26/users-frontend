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
        name: 'Plant',
        imageUrl: 'https://via.placeholder.com/100?text=Plant',
        quantity: 1,
        price: 79.99
      },
      {
        productId: '2',
        name: 'Flower Pot',
        imageUrl: 'https://via.placeholder.com/100?text=Flower+Pot',
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
        name: 'Red flower',
        imageUrl: 'https://via.placeholder.com/100?text=Red+flower',
        quantity: 1,
        price: 29.99
      },
      {
        productId: '4',
        name: 'Purple flower',
        imageUrl: 'https://via.placeholder.com/100?text=Purple+flower',
        quantity: 3,
        price: 9.99
      },
      {
        productId: '5',
        name: 'Plant stand',
        imageUrl: 'https://via.placeholder.com/100?text=Plant+Stand',
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
        name: 'Palm tree',
        imageUrl: 'https://via.placeholder.com/100?text=Palm+tree',
        quantity: 1,
        price: 199.99
      },
      {
        productId: '7',
        name: 'Watering can',
        imageUrl: 'https://via.placeholder.com/100?text=Watering+Can',
        quantity: 1,
        price: 19.99
      },
      {
        productId: '8',
        name: 'Big plant pot',
        imageUrl: 'https://via.placeholder.com/100?text=Big+Plant+Pot',
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
