import create from "zustand";

export const useNewKeyStore = create((set) => ({
  newKeys: [],
  setNewKeys: (newKeys: string[]) => set(newKeys)
}));