import { useEffect, useState } from 'react';
import { fetchOrders } from '../api/orders';
import { Order } from '../types/order';
import OrderCard from '../components/OrderCard';
import { buildAuthenticatedStoreUrl } from '../utils/storeFrontendUtils';

export default function PreviousOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => { document.title = "Monstera - Previous orders"; }, []);
  useEffect(() => {
    fetchOrders()
      .then(setOrders)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const handleProfileClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = buildAuthenticatedStoreUrl("/profile");
  };

  if (loading) return <p className="text-center text-monstera-dark/70 animate-pulse">Loading your orders...</p>;

  if (error) return (
    <div className="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 rounded-r shadow-sm" role="alert">
      <p>{error}</p>
    </div>
  );

  if (orders.length === 0) return (
    <div className="text-center py-12">
      <p className="text-xl text-monstera-green mb-4">You have no previous orders.</p>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-monstera-dark">Previous Orders</h2>
        <a
          href="https://store-frontend-git-store-frontend.2.rahtiapp.fi/profile"
          onClick={handleProfileClick}
          className="px-5 py-2 bg-monstera-green text-white font-bold rounded-xl hover:bg-monstera-dark hover:scale-105 transition-all shadow-md shadow-monstera-green/20"
        >
          Profile
        </a>
      </div>

      {orders.map(order => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
}
