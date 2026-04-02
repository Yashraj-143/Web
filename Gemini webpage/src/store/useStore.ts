import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video';
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  reviews: Review[];
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
  status: 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered';
  estimatedDelivery: string;
  address: Address;
}

export interface Address {
  fullName: string;
  street: string;
  city: string;
  zip: string;
  country: string;
}

export interface AppState {
  theme: 'light' | 'dark';
  toggleTheme: () => void;

  // Auth
  isLoggedIn: boolean;
  user: { name: string; email: string } | null;
  login: (name: string, email: string) => void;
  logout: () => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: () => number;

  // Checkout
  checkoutItems: CartItem[];
  setCheckoutItems: (items: CartItem[]) => void;

  // Orders
  orders: Order[];
  addOrder: (order: Order) => void;

  // Products
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  
  // App state
  addReview: (productId: string, review: Review) => void;
}

// Mock Data
export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Wireless Noise-Cancelling Headphones',
    description: 'Premium over-ear headphones with active noise cancellation and 30-hour battery life.',
    price: 299.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80',
    rating: 4.8,
    reviews: [
      { id: 'r1', userName: 'Alex D.', rating: 5, comment: 'Best headphones I ever bought!', date: '2023-10-01' }
    ]
  },
  {
    id: '2',
    name: 'Minimalist Smartwatch',
    description: 'Track your fitness, heart rate, and notifications with this sleek smartwatch.',
    price: 199.50,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
    rating: 4.5,
    reviews: []
  },
  {
    id: '3',
    name: 'Classic Denim Jacket',
    description: 'Timeless blue denim jacket, perfect for any casual outfit.',
    price: 79.99,
    category: 'Clothing',
    image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=800&q=80',
    rating: 4.2,
    reviews: []
  },
  {
    id: '4',
    name: 'Ceramic Coffee Mug Set',
    description: 'Set of 4 artisan crafted ceramic mugs in pastel colors.',
    price: 34.00,
    category: 'Home & Garden',
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800&q=80',
    rating: 4.9,
    reviews: []
  },
  {
    id: '5',
    name: 'Professional Yoga Mat',
    description: 'Eco-friendly, non-slip yoga mat with alignment lines.',
    price: 45.00,
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&q=80',
    rating: 4.7,
    reviews: []
  },
  {
    id: '6',
    name: 'Mechanical Keyboard',
    description: 'RGB mechanical keyboard with tactile switches for typing and gaming.',
    price: 129.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&q=80',
    rating: 4.6,
    reviews: []
  }
];

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      theme: 'light',
      toggleTheme: () => set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),

      isLoggedIn: false,
      user: null,
      login: (name, email) => set({ isLoggedIn: true, user: { name, email } }),
      logout: () => set({ isLoggedIn: false, user: null }),

      cart: [],
      addToCart: (product) => set((state) => {
        const existing = state.cart.find(item => item.id === product.id);
        if (existing) {
          return {
            cart: state.cart.map(item => 
              item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            )
          };
        }
        return { cart: [...state.cart, { ...product, quantity: 1 }] };
      }),
      removeFromCart: (productId) => set((state) => ({
        cart: state.cart.filter(item => item.id !== productId)
      })),
      updateQuantity: (productId, quantity) => set((state) => ({
        cart: state.cart.map(item => 
          item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
        )
      })),
      clearCart: () => set({ cart: [] }),
      cartTotal: () => {
        return get().cart.reduce((total, item) => total + item.price * item.quantity, 0);
      },

      checkoutItems: [],
      setCheckoutItems: (items) => set({ checkoutItems: items }),

      orders: [],
      addOrder: (order) => set((state) => ({ orders: [order, ...state.orders] })),

      searchQuery: '',
      setSearchQuery: (query) => set({ searchQuery: query }),
      selectedCategory: null,
      setSelectedCategory: (category) => set({ selectedCategory: category }),

      addReview: (_productId, _review) => set((state) => {
        return state;
      })
    }),
    {
      name: 'sayat-storage',
      partialize: (state) => ({ 
        theme: state.theme,
        isLoggedIn: state.isLoggedIn, 
        user: state.user, 
        cart: state.cart,
        orders: state.orders 
      }),
    }
  )
);
