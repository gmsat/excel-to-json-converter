import create from "zustand";
import { getBindingIdentifiers } from "@babel/types";
import keys = getBindingIdentifiers.keys;

interface UseMainStore {
  newKeysZustand: string[];
  setKeys: (keys: string[]) => void
}

export const useMainStore = create<UseMainStore>()((set) => ({
  newKeysZustand: [],
  setKeys: (keys) => set((state) => ({...state, keys}))
}))