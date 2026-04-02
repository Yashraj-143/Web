import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Package, Truck, CheckCircle, Clock } from 'lucide-react';
import { format } from 'date-fns';

export function Orders() {
  const { orders } = useStore();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Processing': return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'Shipped': return <Package className="h-4 w-4 text-blue-500" />;
      case 'Out for Delivery': return <Truck className="h-4 w-4 text-emerald-500" />;
      case 'Delivered': return <CheckCircle className="h-4 w-4 text-gray-900 dark:text-white" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Processing': return 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800/50';
      case 'Shipped': return 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800/50';
      case 'Out for Delivery': return 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/50';
      case 'Delivered': return 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600';
      default: return 'bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700';
    }
  };

  if (orders.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <div className="h-24 w-24 bg-gray-100 dark:bg-gray-800 rounded-none flex items-center justify-center mb-6">
          <Package className="h-10 w-10 text-gray-400 dark:text-gray-500" />
        </div>
        <h2 className="text-2xl font-bold uppercase tracking-widest text-gray-900 dark:text-white mb-4">No orders yet</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8 text-center max-w-md">When you place an order, it will appear here so you can track its status.</p>
        <Link to="/" className="bg-gray-900 dark:bg-emerald-600 text-white px-8 py-4 rounded-none text-sm font-bold uppercase tracking-wider hover:bg-gray-800 dark:hover:bg-emerald-700 transition-colors">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-extrabold uppercase tracking-tight text-gray-900 dark:text-white mb-10 pb-4 border-b border-gray-200 dark:border-gray-800">My Orders</h1>
      
      <div className="space-y-12">
        {orders.map((order) => (
          <div key={order.id} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-none overflow-hidden">
            <div className="bg-gray-50 dark:bg-gray-800/50 px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex flex-wrap gap-x-12 gap-y-4">
                <div>
                  <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Order Placed</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{format(new Date(order.date), 'MMMM d, yyyy')}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Total</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">${order.total.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Ship To</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{order.address.fullName}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Order # {order.id}</span>
              </div>
            </div>

            <div className="p-8">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 pb-8 border-b border-gray-100 dark:border-gray-800 gap-4">
                <div className="flex items-center">
                  <span className={`inline-flex items-center px-3 py-1 rounded-none text-xs font-bold uppercase tracking-wider border ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)}
                    <span className="ml-2">{order.status}</span>
                  </span>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Estimated Delivery</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{format(new Date(order.estimatedDelivery), 'EEEE, MMM d')}</p>
                </div>
              </div>

              {/* Status Tracker */}
              <div className="relative mb-12 hidden sm:block">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-gray-200 dark:border-gray-700" />
                </div>
                <div className="relative flex justify-between">
                  {['Processing', 'Shipped', 'Out for Delivery', 'Delivered'].map((step, stepIdx) => {
                    const statusIndex = ['Processing', 'Shipped', 'Out for Delivery', 'Delivered'].indexOf(order.status);
                    const isCompleted = stepIdx <= statusIndex;
                    const isCurrent = stepIdx === statusIndex;

                    return (
                      <div key={step} className="flex flex-col items-center bg-white dark:bg-gray-900 px-4">
                        <div className={`h-4 w-4 rounded-none flex items-center justify-center border-2 ${isCompleted ? 'bg-gray-900 border-gray-900 dark:bg-emerald-500 dark:border-emerald-500' : 'bg-white border-gray-300 dark:bg-gray-800 dark:border-gray-600'}`}>
                          {isCompleted && <div className="h-1.5 w-1.5 bg-white" />}
                        </div>
                        <span className={`mt-3 text-xs font-bold uppercase tracking-wider ${isCurrent ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-500'}`}>{step}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white mb-4">Items Ordered</h3>
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-6 p-4 border border-gray-100 dark:border-gray-800 rounded-none">
                    <img src={item.image} alt={item.name} className="w-16 h-16 rounded-none object-cover bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700" />
                    <div className="flex-1">
                      <h4 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white"><Link to={`/product/${item.id}`} className="hover:text-emerald-600 dark:hover:text-emerald-400">{item.name}</Link></h4>
                      <p className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mt-1">{item.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">Qty: {item.quantity}</p>
                      <p className="text-sm font-bold text-gray-900 dark:text-white">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
