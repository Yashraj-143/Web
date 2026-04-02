import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';

export function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal, setCheckoutItems } = useStore();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <div className="h-24 w-24 bg-gray-100 dark:bg-gray-800 rounded-none flex items-center justify-center mb-6">
          <ShoppingBag className="h-10 w-10 text-gray-400 dark:text-gray-500" />
        </div>
        <h2 className="text-2xl font-bold uppercase tracking-widest text-gray-900 dark:text-white mb-4">Your cart is empty</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8 text-center max-w-md">Looks like you haven't added anything to your cart yet.</p>
        <Link to="/" className="bg-gray-900 dark:bg-emerald-600 text-white px-8 py-4 rounded-none text-sm font-bold uppercase tracking-wider hover:bg-gray-800 dark:hover:bg-emerald-700 transition-colors">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-extrabold uppercase tracking-tight text-gray-900 dark:text-white mb-10 pb-4 border-b border-gray-200 dark:border-gray-800">Shopping Cart</h1>
      
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
        <div className="lg:col-span-8">
          <ul className="divide-y divide-gray-200 dark:divide-gray-800">
            {cart.map((item) => (
              <li key={item.id} className="flex py-8">
                <div className="flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 rounded-none object-cover object-center sm:w-32 sm:h-32 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                  />
                </div>

                <div className="ml-6 flex-1 flex flex-col justify-between">
                  <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                    <div>
                      <div className="flex justify-between">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white">
                          <Link to={`/product/${item.id}`} className="hover:text-emerald-600 dark:hover:text-emerald-400">{item.name}</Link>
                        </h3>
                      </div>
                      <p className="mt-1 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">{item.category}</p>
                      <p className="mt-4 text-base font-bold text-emerald-600 dark:text-emerald-400">${item.price.toFixed(2)}</p>
                    </div>

                    <div className="mt-4 sm:mt-0 flex flex-col justify-between items-start sm:items-end">
                      <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-none bg-white dark:bg-gray-900">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 focus:outline-none hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="px-4 py-2 text-sm font-bold text-gray-900 dark:text-white border-x border-gray-300 dark:border-gray-600">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 focus:outline-none hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="mt-4 inline-flex items-center text-xs font-bold uppercase tracking-wider text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="h-4 w-4 mr-1" /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Order summary */}
        <section className="mt-16 bg-gray-50 dark:bg-gray-800/50 rounded-none px-6 py-8 sm:p-8 lg:mt-0 lg:col-span-4 border border-gray-200 dark:border-gray-700">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-4">Order summary</h2>

          <dl className="mt-6 space-y-4 text-sm text-gray-600 dark:text-gray-300">
            <div className="flex items-center justify-between">
              <dt className="font-medium">Subtotal</dt>
              <dd className="font-bold text-gray-900 dark:text-white">${cartTotal().toFixed(2)}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="font-medium">Shipping estimate</dt>
              <dd className="font-bold text-gray-900 dark:text-white">$5.00</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="font-medium">Tax estimate</dt>
              <dd className="font-bold text-gray-900 dark:text-white">${(cartTotal() * 0.08).toFixed(2)}</dd>
            </div>
            <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
              <dt className="text-base font-bold uppercase text-gray-900 dark:text-white">Order total</dt>
              <dd className="text-xl font-bold text-emerald-600 dark:text-emerald-400">${(cartTotal() + 5 + cartTotal() * 0.08).toFixed(2)}</dd>
            </div>
          </dl>

          <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8">
            <button
              onClick={() => {
                setCheckoutItems(cart);
                navigate('/checkout', { state: { fromCart: true } });
              }}
              className="w-full bg-gray-900 dark:bg-emerald-600 border border-transparent rounded-none shadow-sm py-4 px-4 text-sm font-bold uppercase tracking-wider text-white hover:bg-gray-800 dark:hover:bg-emerald-700 focus:outline-none transition-colors flex justify-center items-center group"
            >
              Proceed to Checkout
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
