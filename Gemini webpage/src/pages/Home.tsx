import { useMemo } from 'react';
import { useStore, MOCK_PRODUCTS } from '../store/useStore';
import { ProductCard } from '../components/ProductCard';

export function Home() {
  const { searchQuery, selectedCategory, setSelectedCategory } = useStore();

  const categories = useMemo(() => {
    const cats = new Set(MOCK_PRODUCTS.map(p => p.category));
    return ['All', ...Array.from(cats)];
  }, []);

  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || selectedCategory === 'All' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      {!searchQuery && (!selectedCategory || selectedCategory === 'All') && (
        <div className="relative rounded-none overflow-hidden bg-gray-900 dark:bg-black mb-12 border border-gray-800">
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&q=80" 
              alt="Hero" 
              className="w-full h-full object-cover opacity-50 mix-blend-overlay grayscale"
            />
          </div>
          <div className="relative px-8 py-24 sm:px-16 sm:py-32 lg:px-24">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl uppercase">
              Welcome to Sayat
            </h1>
            <p className="mt-6 text-xl text-gray-300 max-w-3xl">
              Discover amazing products across various categories. Shop the latest electronics, fashion, and home goods with fast delivery and secure payments.
            </p>
          </div>
        </div>
      )}

      {/* Categories */}
      <div className="mb-8 overflow-x-auto pb-4 hide-scrollbar border-b border-gray-200 dark:border-gray-800">
        <div className="flex space-x-4">
          {categories.map(category => {
            const isSelected = selectedCategory === category || (!selectedCategory && category === 'All');
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`pb-4 px-2 text-sm font-bold uppercase tracking-wider whitespace-nowrap transition-colors border-b-2 ${
                  isSelected
                    ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400 dark:border-emerald-400'
                    : 'border-transparent text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 border border-dashed border-gray-300 dark:border-gray-700">
          <p className="text-xl font-medium text-gray-500 dark:text-gray-400 uppercase tracking-widest">No products found</p>
        </div>
      )}
    </div>
  );
}
