import { create } from 'zustand';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  available: boolean;
  isPopular: boolean;
  rating: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface AppState {
  // View mode
  view: 'customer' | 'admin';
  setView: (view: 'customer' | 'admin') => void;

  // Cart
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: () => number;
  cartCount: () => number;

  // Search & Filter
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;

  // Menu items
  menuItems: MenuItem[];
  setMenuItems: (items: MenuItem[]) => void;

  // Cart drawer
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;

  // Reservation dialog
  isReservationOpen: boolean;
  setReservationOpen: (open: boolean) => void;

  // Order tracking
  currentOrderId: string | null;
  setCurrentOrderId: (id: string | null) => void;

  // Active section for customer page
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const useStore = create<AppState>((set, get) => ({
  // View mode
  view: 'customer',
  setView: (view) => set({ view }),

  // Cart
  cart: [],
  addToCart: (item) => {
    const { cart } = get();
    const existing = cart.find((c) => c.id === item.id);
    if (existing) {
      set({
        cart: cart.map((c) =>
          c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
        ),
      });
    } else {
      set({ cart: [...cart, { ...item, quantity: 1 }] });
    }
  },
  removeFromCart: (id) => {
    set({ cart: get().cart.filter((c) => c.id !== id) });
  },
  updateQuantity: (id, quantity) => {
    if (quantity <= 0) {
      set({ cart: get().cart.filter((c) => c.id !== id) });
    } else {
      set({
        cart: get().cart.map((c) =>
          c.id === id ? { ...c, quantity } : c
        ),
      });
    }
  },
  clearCart: () => set({ cart: [] }),
  cartTotal: () => {
    return get().cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  },
  cartCount: () => {
    return get().cart.reduce((sum, item) => sum + item.quantity, 0);
  },

  // Search & Filter
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  selectedCategory: 'All',
  setSelectedCategory: (category) => set({ selectedCategory: category }),

  // Menu items
  menuItems: [],
  setMenuItems: (items) => set({ menuItems: items }),

  // Cart drawer
  isCartOpen: false,
  setCartOpen: (open) => set({ isCartOpen: open }),

  // Reservation dialog
  isReservationOpen: false,
  setReservationOpen: (open) => set({ isReservationOpen: open }),

  // Order tracking
  currentOrderId: null,
  setCurrentOrderId: (id) => set({ currentOrderId: id }),

  // Active section
  activeSection: 'home',
  setActiveSection: (section) => set({ activeSection: section }),
}));
