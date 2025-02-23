import { DecryptUrlResponse } from "@/app/dto/decry.dto";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface ClienteStore {
  clientId: number | null;
  amount: number | null;
  purchaseNumber: number | null;
  clientMail: string | null;
  name: string | null;

  setClientData: (data: DecryptUrlResponse) => void;
  clearClientData: () => void;
}

export const useClienteStore = create<ClienteStore>()(
  persist(
    (set) => ({
      clientId: null,
      amount: null,
      purchaseNumber: null,
      clientMail: null,
      name: null,

      setClientData: (data: DecryptUrlResponse) => {
        set({
          clientId: data.customerId,
          amount: data.amount,
          purchaseNumber: data.purchaseNumber,
          clientMail: data.clientMail,
          name: data.name,
        });
      },

      clearClientData: () =>
        set({
          clientId: null,
          amount: null,
          purchaseNumber: null,
          clientMail: null,
          name: null,
        }),
    }),
    {
      name: "client-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
