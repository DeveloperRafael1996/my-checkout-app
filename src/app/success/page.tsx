"use client";

import { useSearchParams } from "next/navigation";

const SuccessPage = () => {
  const searchParams = useSearchParams();

  const amount = searchParams.get("amount");
  const purchaseNumber = searchParams.get("purchaseNumber");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <h1 className="text-2xl font-bold text-green-600">Pago Exitoso 🎉</h1>
      <p className="text-lg">Monto: {amount}</p>
      <p className="text-lg">Número de compra: {purchaseNumber}</p>
    </div>
  );
};

export default SuccessPage;
