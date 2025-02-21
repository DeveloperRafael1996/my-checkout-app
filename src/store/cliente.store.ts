import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface ClienteStore {
  clientId: number | null;
  setClientId: (customerId: number) => void;
  clearClientId: () => void;
}

export const useClienteStore = create<ClienteStore>()(
  persist(
    (set) => ({
      clientId: null,
      setClientId: (customerId: number) => {
        console.log("Seteando ClientId:", customerId);
        set({ clientId: customerId });
      },
      clearClientId: () => set({ clientId: null }),
    }),
    {
      name: "client-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
