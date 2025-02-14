"use client";

import { useSearchParams } from "next/navigation";

const SuccessPage = () => {
  const searchParams = useSearchParams();

  const transactionToken = searchParams.get("transactionToken");
  const purchaseNumber = searchParams.get("purchaseNumber");
  const amount = searchParams.get("amount");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <h1 className="text-2xl font-bold text-green-600">Pago Exitoso 🎉</h1>
      <p className="text-lg">Transaction: {transactionToken}</p>
      <p className="text-lg">Número de Compra: {purchaseNumber}</p>
      <p className="text-lg">Monto: {amount}</p>
    </div>
  );
};

export default SuccessPage;
