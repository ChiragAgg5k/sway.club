import { type Product } from "@/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface CartItem extends Product {
  quantity: number;
  size: "S" | "M" | "L" | "XL" | "XXL";
}

type CartStore = {
  cart: CartItem[];
  count: () => number;
  add: (
    product: Product,
    quantity?: number,
    size?: "S" | "M" | "L" | "XL" | "XXL",
  ) => void;
  remove: (product: Product, size?: "S" | "M" | "L" | "XL" | "XXL") => void;
  increaseCount: (product: Product, quantity?: number) => void;
  decreaseCount: (product: Product, quantity?: number) => void;
  clear: () => void;
  checkIfInCart: (
    sku_code: string,
    size?: "S" | "M" | "L" | "XL" | "XXL",
  ) => boolean;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cart: [],
      count: () => {
        const { cart } = get();
        return cart.reduce((acc, item) => acc + item.quantity, 0);
      },
      // add product if the product with same sku_code and size is not already in cart
      add: (
        product: Product,
        quantity = 1,
        size: "S" | "M" | "L" | "XL" | "XXL" = "M",
      ) =>
        set((state) => {
          const { cart } = state;
          const existingItem = cart.find(
            (item) => item.sku_code === product.sku_code && item.size === size,
          );
          if (existingItem) {
            return {
              cart: cart.map((item) =>
                item.sku_code === product.sku_code && item.size === size
                  ? { ...item, quantity: item.quantity + quantity }
                  : item,
              ),
            };
          }
          return {
            cart: [
              ...cart,
              {
                ...product,
                quantity,
                size,
              },
            ],
          };
        }),
      increaseCount: (product, quantity = 1) =>
        set((state) => {
          const updatedCart = state.cart.map((item) =>
            item.sku_code === product.sku_code
              ? { ...item, quantity: item.quantity + quantity }
              : item,
          );
          return {
            cart: updatedCart,
          };
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
      remove: (product, size = "M") =>
        set((state) => ({
          cart: state.cart.filter(
            (item) => item.sku_code !== product.sku_code || item.size !== size,
          ),
        })),
      clear: () => set({ cart: [] }),
      checkIfInCart: (
        sku_code: string,
        size?: "S" | "M" | "L" | "XL" | "XXL",
      ) => {
        const { cart } = get();
        if (size === undefined) return false;
        return cart.some(
          (item) => item.sku_code === sku_code && item.size === size,
        );
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
