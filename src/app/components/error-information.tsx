"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { WhatsappButton } from "../components/whatsapp-button";

interface Props {
  date?: number;
  purchaseNumber?: string;
  errorInformation?: string;
}

export const ErrorInformation: React.FC<Props> = ({
  date,
  errorInformation = "ERR_UNKNOWN",
  purchaseNumber = "No disponible",
}) => {
  const currentDate = Intl.DateTimeFormat("es-PE", {
    hour12: true,
  }).format(date ?? new Date());

  const router = useRouter();

  return (
    <div className="flex justify-center items-center h-dvh">
      <Card className="w-full max-w-[400px] border-[#FF3A3A]/20 shadow-lg shadow-[#FF3A3A]/10">
        <CardHeader className="pb-4">
          <CardTitle className="text-center text-xl font-bold text-[#FF3A3A]">
            Lo sentimos, ha ocurrido un error
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
            className="space-y-3"
          >
            <p className="text-center text-sm text-gray-700">
              Ha ocurrido un error inesperado durante el proceso
            </p>
            <p className="text-center text-sm text-gray-600">
              Por favor, intente nuevamente o contacte con nuestro servicio de
              atención al cliente
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
              {currentDate}
            </p>
            <p className="text-xs text-gray-600">
              <span className="font-semibold text-[#FF3A3A]">Error:</span>{" "}
              {errorInformation}
            </p>
          </motion.div>
          <div className="pt-2 space-y-2">
            <Button
              onClick={() => router.back()}
              className="w-full py-2 bg-[#FF3A3A] text-white rounded-md hover:bg-[#FF3A3A]/90 transition-colors"
            >
              Intentar nuevamente
            </Button>
            <WhatsappButton />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
