import { type Product } from "@/lib/db/schema";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem extends Product {
  quantity: number;
  size: string;
}

export const useCartStore = create(
  persist(
    (set) => ({
      items: [],
      addItem: (product: CartItem) =>
        set((state: any) => {
          const existingItem = state.items.find(
            (item: CartItem) =>
              item.id === product.id && item.size === product.size
          );
          if (existingItem) {
            return {
              items: state.items.map((item: CartItem) =>
                item.id === product.id && item.size === product.size
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }
          return {
            items: [...state.items, { ...product, quantity: 1 }],
          };
        }),
      removeItem: (id: number, size: string) =>
        set((state: any) => ({
          items: state.items.filter(
            (item: CartItem) => !(item.id === id && item.size === size)
          ),
        })),
      clearCart: () =>
        set(() => ({
          items: [],
        })),
      updateQuantity: (id: number, size: string, quantity: number) =>
        set((state: any) => ({
          items: state.items.map((item: CartItem) =>
            item.id === id && item.size === size
              ? { ...item, quantity: Math.max(1, quantity) }
              : item
          ),
        })),
    }),
    { name: "cart" }
  )
);
