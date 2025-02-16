"use client";

import { motion } from "framer-motion";
import { XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TransactionState } from "../dto/transaction.dto";
import { convertTimestampText } from "../utils/date";
import { useRouter } from "next/navigation";

export default function PagoErrorMobile({
  state,
  purchaseNumber,
}: {
  state: TransactionState;
  purchaseNumber: string;
}) {
  const router = useRouter();

  if (state.status !== "error") return null;
  const { data, header } = state.error;
  const date = convertTimestampText(header?.ecoreTransactionDate);

  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#FFF0F0] to-[#FFE5E5] px-4">
      <Card className="w-full max-w-[340px] border-[#FF3A3A]/20 shadow-lg shadow-[#FF3A3A]/10">
        <CardHeader className="pb-4">
          <CardTitle className="text-center text-xl font-bold text-[#FF3A3A]">
            Error de Pago
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <motion.div
            className="flex justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <XCircle className="w-20 h-20 text-[#FF3A3A]" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-center text-sm text-gray-700">
              {data?.ACTION_DESCRIPTION}
            </p>
          </motion.div>
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <p className="text-xs text-gray-600">
              <span className="font-semibold text-[#FF3A3A]">
                Numero Pedido:
              </span>{" "}
              {purchaseNumber}
            </p>
            <p className="text-xs text-gray-600">
              <span className="font-semibold text-[#FF3A3A]">Fecha:</span>{" "}
              {date}
            </p>
          </motion.div>
        </CardContent>
        <CardFooter className="pt-2">
          <Button
            className="w-full bg-[#FF3A3A] hover:bg-[#CC2E2E] transition-colors duration-300 text-sm py-2"
            onClick={handleGoHome}
          >
            Intentar de Nuevo
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
