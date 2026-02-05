import { useEffect, useState } from 'react';
import { fetchOrders } from '../api/orders';
import { Order } from '../types/order';
import OrderCard from '../components/OrderCard';
import '../styles/orders.css';

export default function PreviousOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders()
      .then(setOrders)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading your orders...</p>;
  if (error) return <p className="error">{error}</p>;
  if (orders.length === 0) return <p>You have no previous orders.</p>;

  return (
    <div className="orders-page">
      <h2>Previous Orders</h2>

      {orders.map(order => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
}
