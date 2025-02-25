"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { XCircle } from "lucide-react";
import { Phone } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ErrorPage() {
  const currentDate = Intl.DateTimeFormat("es-PE", {
    hour12: true,
  }).format(new Date());

  const router = useRouter();

  const handleWhatsAppSupport = () => {
    window.open(
      "https://wa.me/51999999999?text=Hola,%20necesito%20ayuda%20con%20mi%20pedido",
      "_blank"
    );
  };

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
              No disponible
            </p>
            <p className="text-xs text-gray-600">
              <span className="font-semibold text-[#FF3A3A]">Fecha:</span>{" "}
              {currentDate}
            </p>
            <p className="text-xs text-gray-600">
              <span className="font-semibold text-[#FF3A3A]">
                Código de Error:
              </span>{" "}
              ERR_UNKNOWN
            </p>
          </motion.div>
          <div className="pt-2 space-y-2">
            <button
              onClick={() => router.back()}
              className="w-full py-2 bg-[#FF3A3A] text-white rounded-md hover:bg-[#FF3A3A]/90 transition-colors"
            >
              Intentar nuevamente
            </button>
            <button
              onClick={handleWhatsAppSupport}
              className="w-full py-2 bg-[#25D366] text-white rounded-md hover:bg-[#25D366]/90 transition-colors flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              Contactar por WhatsApp
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
