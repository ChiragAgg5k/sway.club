import { type Product } from "@/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface CartItem extends Product {
  quantity: number;
}

type CartStore = {
  cart: CartItem[];
  count: () => number;
  add: (product: Product, quantity?: number) => void;
  remove: (product: Product) => void;
  decreaseCount: (product: Product, quantity?: number) => void;
  clear: () => void;
  checkIfInCart: (sku_code: string) => boolean;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],
      count: () => {
        const { cart } = get();
        return cart.reduce((acc, item) => acc + item.quantity, 0);
      },
      add: (product, quantity = 1) =>
        set((state) => {
          const item = state.cart.find(
            (item) => item.sku_code === product.sku_code,
          );
          if (item) {
            return {
              cart: state.cart.map((cartItem) =>
                cartItem.sku_code === product.sku_code
                  ? { ...cartItem, quantity: cartItem.quantity + quantity }
                  : cartItem,
              ),
            };
          } else {
            return { cart: [...state.cart, { ...product, quantity }] };
          }
        }),
      decreaseCount: (product, quantity = 1) =>
        set((state) => {
          const updatedCart = state.cart.map((item) =>
            item.sku_code === product.sku_code
              ? { ...item, quantity: Math.max(0, item.quantity - quantity) }
              : item,
          );
          return {
            cart: updatedCart.filter((item) => item.quantity > 0),
          };
        }),
      remove: (product) =>
        set((state) => {
          const updatedCart = state.cart.filter(
            (item) => item.sku_code !== product.sku_code,
          );
          return {
            cart: updatedCart,
          };
        }),
      clear: () => set({ cart: [] }),
      checkIfInCart: (sku_code: string) => {
        const { cart } = get();
        return cart.some((item) => item.sku_code === sku_code);
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
