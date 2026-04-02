import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useStore } from '../store/useStore';
import type { Address, Order } from '../store/useStore';
import { CreditCard, Truck, ShieldCheck } from 'lucide-react';

export function Checkout() {
  const { checkoutItems, addOrder, clearCart, isLoggedIn } = useStore();
  const navigate = useNavigate();
  const location = useLocation();
  
  const fromCart = location.state?.fromCart ?? true;
  const checkoutTotal = checkoutItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const [address, setAddress] = useState<Address>({
    fullName: '',
    street: '',
    city: '',
    zip: '',
    country: ''
  });

  const [payment, setPayment] = useState({
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const [isProcessing, setIsProcessing] = useState(false);

  // Redirect if empty or not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login', { state: { from: { pathname: '/checkout' } } });
    } else if (checkoutItems.length === 0) {
      navigate('/cart');
    }
  }, [checkoutItems.length, isLoggedIn, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      const total = checkoutTotal + 5 + checkoutTotal * 0.08;
      
      const newOrder: Order = {
        id: `ORD-${Math.floor(Math.random() * 1000000)}`,
        items: [...checkoutItems],
        total,
        date: new Date().toISOString(),
        status: 'Processing',
        estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        address
      };

      addOrder(newOrder);
      if (fromCart) {
        clearCart();
      }
      setIsProcessing(false);
      navigate('/thank-you', { state: { orderId: newOrder.id } });
    }, 2000);
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPayment({ ...payment, [e.target.name]: e.target.value });
  };

  if (!isLoggedIn || checkoutItems.length === 0) return null;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-extrabold uppercase tracking-tight text-gray-900 dark:text-white mb-10 pb-4 border-b border-gray-200 dark:border-gray-800">Checkout</h1>

      <form onSubmit={handleSubmit} className="space-y-12">
        {/* Shipping Address */}
        <div className="bg-white dark:bg-gray-900 p-8 rounded-none shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center mb-8 pb-4 border-b border-gray-100 dark:border-gray-800">
            <Truck className="h-5 w-5 text-gray-900 dark:text-white mr-3" />
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-900 dark:text-white">Shipping Address</h2>
          </div>
          <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
              <input type="text" name="fullName" required value={address.fullName} onChange={handleAddressChange} className="block w-full rounded-none border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm p-3 border transition-colors" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">Street Address</label>
              <input type="text" name="street" required value={address.street} onChange={handleAddressChange} className="block w-full rounded-none border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm p-3 border transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">City</label>
              <input type="text" name="city" required value={address.city} onChange={handleAddressChange} className="block w-full rounded-none border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm p-3 border transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">ZIP / Postal Code</label>
              <input type="text" name="zip" required value={address.zip} onChange={handleAddressChange} className="block w-full rounded-none border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm p-3 border transition-colors" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">Country</label>
              <input type="text" name="country" required value={address.country} onChange={handleAddressChange} className="block w-full rounded-none border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm p-3 border transition-colors" />
            </div>
          </div>
        </div>

        {/* Payment Details */}
        <div className="bg-white dark:bg-gray-900 p-8 rounded-none shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center mb-8 pb-4 border-b border-gray-100 dark:border-gray-800">
            <CreditCard className="h-5 w-5 text-gray-900 dark:text-white mr-3" />
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-900 dark:text-white">Payment Details</h2>
          </div>
          <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-4 sm:gap-x-6">
            <div className="sm:col-span-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">Card Number</label>
              <input type="text" name="cardNumber" required placeholder="0000 0000 0000 0000" value={payment.cardNumber} onChange={handlePaymentChange} className="block w-full rounded-none border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm p-3 border transition-colors font-mono" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">Expiration Date</label>
              <input type="text" name="expiry" required placeholder="MM/YY" value={payment.expiry} onChange={handlePaymentChange} className="block w-full rounded-none border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm p-3 border transition-colors font-mono" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">CVV</label>
              <input type="text" name="cvv" required placeholder="123" value={payment.cvv} onChange={handlePaymentChange} className="block w-full rounded-none border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm p-3 border transition-colors font-mono" />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="bg-gray-50 dark:bg-gray-800/50 p-8 rounded-none border border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row items-center justify-between">
          <div className="flex items-center text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-6 sm:mb-0">
            <ShieldCheck className="h-5 w-5 text-emerald-500 mr-2" />
            Secure Encrypted Checkout
          </div>
          <div className="flex items-center space-x-8 w-full sm:w-auto">
            <div className="text-right flex-1 sm:flex-none">
              <p className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Total to pay</p>
              <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">${(checkoutTotal + 5 + checkoutTotal * 0.08).toFixed(2)}</p>
            </div>
            <button
              type="submit"
              disabled={isProcessing}
              className={`inline-flex justify-center items-center py-4 px-8 border border-transparent shadow-sm text-sm font-bold uppercase tracking-wider text-white bg-gray-900 dark:bg-emerald-600 hover:bg-gray-800 dark:hover:bg-emerald-700 focus:outline-none transition-colors rounded-none ${isProcessing ? 'opacity-75 cursor-not-allowed' : ''}`}
            >
              {isProcessing ? 'Processing...' : 'Place Order'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
