import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, User, Menu, X, LogOut, Package, Moon, Sun, MapPin, Grid, HelpCircle } from 'lucide-react';
import { useStore } from '../store/useStore';

export function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const { cart, isLoggedIn, user, logout, searchQuery, setSearchQuery, theme, toggleTheme } = useStore();
  const navigate = useNavigate();

  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <>
      <nav className="bg-white dark:bg-gray-900 shadow-sm dark:shadow-gray-800/50 sticky top-0 z-40 transition-colors duration-200 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-4">
              <button 
                onClick={toggleTheme} 
                className="p-2 rounded-none hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              <Link to="/" className="flex-shrink-0 flex items-center">
                <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 tracking-tight">Sayat</span>
              </Link>
            </div>
            
            <div className="flex-1 flex items-center justify-center px-2 lg:ml-6 lg:justify-end">
              <div className="max-w-lg w-full lg:max-w-xs">
                <form onSubmit={handleSearch} className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                  </div>
                  <input
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-700 rounded-none leading-5 bg-gray-50 dark:bg-gray-800 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition duration-150 ease-in-out"
                    placeholder="Search products..."
                    type="search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </form>
              </div>
            </div>

            <div className="flex items-center ml-4 space-x-4">
              <Link to="/cart" className="flex items-center text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 relative p-2">
                <ShoppingCart className="h-6 w-6" />
                {cartItemsCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-emerald-600 rounded-none">
                    {cartItemsCount}
                  </span>
                )}
              </Link>
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="inline-flex items-center justify-center p-2 rounded-none text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-emerald-500"
              >
                <Menu className="block h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Right Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={() => setIsSidebarOpen(false)} />
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white dark:bg-gray-900 shadow-xl flex flex-col transform transition-transform duration-300 ease-in-out border-l border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white uppercase tracking-wider">Menu</h2>
              <button onClick={() => setIsSidebarOpen(false)} className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 p-2 rounded-none hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-4 flex-1 overflow-y-auto space-y-2">
              {isLoggedIn ? (
                <div className="mb-6 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-none border border-emerald-100 dark:border-emerald-800/30">
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200">Hi, {user?.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
                </div>
              ) : null}

              <Link to={isLoggedIn ? "/account" : "/login"} onClick={() => setIsSidebarOpen(false)} className="flex items-center p-3 rounded-none hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 font-medium transition-colors border-l-2 border-transparent hover:border-emerald-500">
                <User className="h-5 w-5 mr-3 text-gray-400 dark:text-gray-500" /> Account
              </Link>
              <Link to="/checkout" onClick={() => setIsSidebarOpen(false)} className="flex items-center p-3 rounded-none hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 font-medium transition-colors border-l-2 border-transparent hover:border-emerald-500">
                <MapPin className="h-5 w-5 mr-3 text-gray-400 dark:text-gray-500" /> Address
              </Link>
              <Link to="/orders" onClick={() => setIsSidebarOpen(false)} className="flex items-center p-3 rounded-none hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 font-medium transition-colors border-l-2 border-transparent hover:border-emerald-500">
                <Package className="h-5 w-5 mr-3 text-gray-400 dark:text-gray-500" /> Orders
              </Link>
              <Link to="/" onClick={() => setIsSidebarOpen(false)} className="flex items-center p-3 rounded-none hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 font-medium transition-colors border-l-2 border-transparent hover:border-emerald-500">
                <Grid className="h-5 w-5 mr-3 text-gray-400 dark:text-gray-500" /> Category
              </Link>
              <Link to="#" onClick={() => setIsSidebarOpen(false)} className="flex items-center p-3 rounded-none hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200 font-medium transition-colors border-l-2 border-transparent hover:border-emerald-500">
                <HelpCircle className="h-5 w-5 mr-3 text-gray-400 dark:text-gray-500" /> Help / Customer Care
              </Link>
            </div>

            {isLoggedIn && (
              <div className="p-4 border-t border-gray-200 dark:border-gray-800">
                <button 
                  onClick={() => { logout(); setIsSidebarOpen(false); }} 
                  className="flex items-center w-full p-3 rounded-none hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 font-medium transition-colors border-l-2 border-transparent hover:border-red-500"
                >
                  <LogOut className="h-5 w-5 mr-3" /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
