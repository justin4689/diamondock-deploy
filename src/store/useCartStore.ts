import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: {
    image_url: string;
  };
  quantity: number;
  size?: string;
  color?: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (itemKey: string) => void;
  updateQuantity: (itemKey: string, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getTotal: () => number;
  getShippingCost: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (newItem) => {
        set((state) => {
          const itemKey = `${newItem.id}-${newItem.size || 'no-size'}-${newItem.color || 'no-color'}`;
          const existingItemIndex = state.items.findIndex(item => 
            `${item.id}-${item.size || 'no-size'}-${item.color || 'no-color'}` === itemKey
          );

          if (existingItemIndex !== -1) {
            const updatedItems = [...state.items];
            const currentQuantity = updatedItems[existingItemIndex].quantity;
            updatedItems[existingItemIndex] = {
              ...updatedItems[existingItemIndex],
              quantity: currentQuantity + newItem.quantity
            };
            return { items: updatedItems };
          }

          return { items: [...state.items, { ...newItem }] };
        });
      },

      removeItem: (itemKey: string) => {
        set((state) => {
          const updatedItems = state.items.filter(item => {
            const currentItemKey = `${item.id}-${item.size || 'no-size'}-${item.color || 'no-color'}`;
            return currentItemKey !== itemKey;
          });
          return { items: updatedItems };
        });
      },

      updateQuantity: (itemKey: string, quantity: number) => {
        if (quantity < 1) return;
        set((state) => {
          const updatedItems = state.items.map(item => {
            const currentItemKey = `${item.id}-${item.size || 'no-size'}-${item.color || 'no-color'}`;
            return currentItemKey === itemKey ? { ...item, quantity } : item;
          });
          return { items: updatedItems };
        });
      },

      clearCart: () => {
        set({ items: [] });
      },

      getItemCount: () => {
        const state = get();
        return state.items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotal: () => {
        const state = get();
        return state.items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },

      getShippingCost: () => {
        const total = get().getTotal();
        return total > 50 ? 0 : 5.99;
      },
    }),
    {
      name: 'shopping-cart',
      storage: createJSONStorage(() => localStorage),
      version: 1,
    }
  )
);
