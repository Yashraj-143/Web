import { Link, useLocation } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

export function ThankYou() {
  const location = useLocation();
  const orderId = location.state?.orderId || `ORD-${Math.floor(Math.random() * 1000000)}`;

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-16">
      <div className="h-20 w-20 bg-emerald-50 dark:bg-emerald-900/20 rounded-none flex items-center justify-center mb-8 border border-emerald-200 dark:border-emerald-800/50">
        <CheckCircle className="h-10 w-10 text-emerald-500 dark:text-emerald-400" />
      </div>
      <h1 className="text-3xl font-extrabold uppercase tracking-widest text-gray-900 dark:text-white mb-4 text-center">Order Confirmed</h1>
      <p className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-8 text-center max-w-md">
        Your payment was successful and your order is now being processed.
      </p>
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-none px-8 py-6 mb-10 border border-gray-200 dark:border-gray-700 text-center">
        <p className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">Order ID</p>
        <p className="text-lg font-mono font-bold text-gray-900 dark:text-white">{orderId}</p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
        <Link 
          to="/orders" 
          className="flex-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-900 dark:border-gray-600 px-6 py-3 rounded-none text-sm font-bold uppercase tracking-wider hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-center"
        >
          View Orders
        </Link>
        <Link 
          to="/" 
          className="flex-1 bg-gray-900 dark:bg-emerald-600 text-white border-2 border-transparent px-6 py-3 rounded-none text-sm font-bold uppercase tracking-wider hover:bg-gray-800 dark:hover:bg-emerald-700 transition-colors text-center"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
