import { create } from "zustand";
import { combine, persist } from "zustand/middleware";

type userT = {
  id: number;
  profile_picture: string;
  name: string;
  email: string;
  access_token: string;
  refresh_token: string;
  id_token: string;
};

type IStore = {
  user: userT;
  setUser: (user: userT) => void;
};

export const useStore = create<IStore>()(
  persist(
    combine(
      {
        user: {
          id: -1,
          name: "",
          email: "",
          profile_picture: "",
          access_token: "",
          refresh_token: "",
          id_token: "",
        },
      },
      (set) => ({
        setUser: (user) => set(() => ({ user })),
      }),
    ),
    {
      name: "store",
    },
  ),
); // Path: src/ui/hooks/useStore.ts
