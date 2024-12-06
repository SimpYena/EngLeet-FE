import { create } from "zustand";

interface TotalPagesState {
  totalPages: number;
  setTotalPages: (pages: number) => void;
}

const useTotalPagesStore = create<TotalPagesState>((set) => ({
  totalPages: 0,
  setTotalPages: (pages) => set({ totalPages: pages }),
}));

export default useTotalPagesStore;
