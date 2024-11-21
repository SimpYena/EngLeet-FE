import { User } from "@/types/user.type";
import { create } from "zustand";

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
}

const useUserStore = create<UserState>((set) => ({
  user: null,

  setUser: (user: User) => set({ user }),
}));

export default useUserStore;
