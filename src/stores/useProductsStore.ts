import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface ProductsStore {
  products: string[];
  setProducts: (products: string[]) => void;
}

const useProductsStore = create<ProductsStore>()(
  immer((set) => ({
    products: [],
    setProducts: (products: string[]) =>
      set((state) => {
        state.products = products;
      }),
  }))
);

export default useProductsStore;
