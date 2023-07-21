import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export const useTokenStore = create<TokenStore>()(
  immer((set) => ({
    token: "",
    setToken: (token: string) =>
      set((state) => {
        state.token = token;
      }),
  }))
);

interface TokenStore {
  token: string;
  setToken: (token: string) => void;
}
