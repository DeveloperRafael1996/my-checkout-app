import { DecryptUrlResponse } from "@/app/dto/decry.dto";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface ClienteStore {
  clientId: number | null;
  amount: number | null;
  purchaseNumber: number | null;
  clientMail: string | null;
  name: string | null;
  document_number: string | null;
  phone_number: string | null;
  createdAt: string | null;

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
      document_number: null,
      phone_number: null,
      createdAt: null,

      setClientData: (data: DecryptUrlResponse) => {
        set({
          clientId: data.customerId,
          amount: data.amount,
          purchaseNumber: data.purchaseNumber,
          clientMail: data.clientMail,
          name: data.name,
          document_number: data.document_number,
          phone_number: data.phone_number,
          createdAt: data.createdAt,
        });
      },

      clearClientData: () =>
        set({
          clientId: null,
          amount: null,
          purchaseNumber: null,
          clientMail: null,
          name: null,
          document_number: null,
          phone_number: null,
          createdAt: null,
        }),
    }),
    {
      name: "client-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
