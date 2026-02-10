import { Order } from '../types/order';

interface OrderCardProps {
  order: Order;
}

export default function OrderCard({ order }: OrderCardProps) {
  return (
    <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-7 mb-8 border border-monstera-green/20 shadow-[0_10px_30px_rgba(64,81,59,0.12)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_40px_rgba(64,81,59,0.18)] hover:scale-[1.015]">
      <div className="flex justify-between items-center text-lg font-bold text-monstera-green border-b border-monstera-green/15 pb-4 mb-4">
        <span>Order #{order.id}</span>
        <span className="text-monstera-dark/80 font-normal text-base">{new Date(order.createdAt).toLocaleDateString()}</span>
      </div>

      <div className="mb-6 text-monstera-medium font-medium tracking-wide">
        Status: <strong className="text-monstera-dark font-bold font-branding text-lg ml-2">{order.status}</strong>
      </div>

      <div className="pt-5 border-t border-monstera-green/20 border-dashed space-y-3">
        {order.items.map(item => (
          <div className="flex items-center gap-5 p-4 bg-[#EDF1D6]/60 rounded-2xl border border-monstera-green/10 transition-transform hover:translate-x-1.5 hover:bg-[#EDF1D6]/80" key={item.productId}>
            <img
              src={item.imageUrl}
              alt={item.name}
              className="w-20 h-20 object-cover rounded-xl border-2 border-monstera-green/20 shadow-sm"
            />
            <div>
              <p className="font-semibold text-monstera-dark text-lg">{item.name}</p>
              <p className="text-monstera-green/80">Qty: {item.quantity}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-5 border-t-2 border-monstera-medium text-xl font-extrabold text-monstera-dark text-right tracking-wide">
        Total: ${order.total.toFixed(2)}
      </div>
    </div>
  );
}
