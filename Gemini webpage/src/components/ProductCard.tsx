import { Star, ShoppingCart } from 'lucide-react';
import type { Product } from '../store/useStore';
import { useStore } from '../store/useStore';
import { Link } from 'react-router-dom';

export function ProductCard({ product }: { product: Product }) {
  const addToCart = useStore(state => state.addToCart);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <Link to={`/product/${product.id}`} className="group relative block bg-white dark:bg-gray-800 rounded-none shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700">
      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200 dark:bg-gray-700">
        <img
          src={product.image}
          alt={product.name}
          className="h-64 w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-5 border-t border-gray-100 dark:border-gray-700">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white line-clamp-2 uppercase tracking-wide">{product.name}</h3>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 uppercase">{product.category}</p>
          </div>
          <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">${product.price.toFixed(2)}</p>
        </div>
        <div className="flex items-center mb-5">
          <Star className="h-4 w-4 text-emerald-500 fill-current" />
          <span className="ml-1 text-sm font-medium text-gray-700 dark:text-gray-300">{product.rating}</span>
          <span className="ml-1 text-xs text-gray-400 dark:text-gray-500">({product.reviews.length} reviews)</span>
        </div>
        <button
          onClick={handleAddToCart}
          className="w-full flex items-center justify-center space-x-2 bg-gray-900 dark:bg-gray-700 hover:bg-emerald-600 dark:hover:bg-emerald-600 text-white py-3 px-4 rounded-none text-sm font-bold uppercase tracking-wider transition-colors"
        >
          <ShoppingCart className="h-4 w-4" />
          <span>Add to Cart</span>
        </button>
      </div>
    </Link>
  );
}
