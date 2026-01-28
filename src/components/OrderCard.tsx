import { Order } from '../types/order';
import '../styles/orders.css';

interface OrderCardProps {
  order: Order;
}

export default function OrderCard({ order }: OrderCardProps) {
  return (
    <div className="order-card">
      <div className="order-header">
        <span>Order #{order.id}</span>
        <span>{new Date(order.createdAt).toLocaleDateString()}</span>
      </div>

      <div className="order-status">
        Status: <strong>{order.status}</strong>
      </div>

      <div className="order-items">
        {order.items.map(item => (
          <div className="order-item" key={item.productId}>
            <img src={item.imageUrl} alt={item.name} />
            <div>
              <p>{item.name}</p>
              <p>Qty: {item.quantity}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="order-total">
        Total: ${order.total.toFixed(2)}
      </div>
    </div>
  );
}
