import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { XCircle } from "lucide-react";

export default function ErrorPage() {

    const currentDate = Intl.DateTimeFormat("es-PE",{
        hour12: true,
    }).format(new Date())

  return (
    <div className="flex justify-center items-center h-dvh">
        <Card className="w-full max-w-[340px] border-[#FF3A3A]/20 shadow-lg shadow-[#FF3A3A]/10">
      <CardHeader className="pb-4">
        <CardTitle className="text-center text-xl font-bold text-[#FF3A3A]">
          Error de Pagina
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
            Error
          </p>
        </motion.div>
        <motion.div
          className="space-y-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-xs text-gray-600">
            <span className="font-semibold text-[#FF3A3A]">Descripcion:</span>{" "}
            Contactar Soporte Belity
          </p>
          <p className="text-xs text-gray-600">
            <span className="font-semibold text-[#FF3A3A]">Fecha:</span> {currentDate}
          </p>
        </motion.div>
      </CardContent>
    </Card>
    </div>
  );
}
