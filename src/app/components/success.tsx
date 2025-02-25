"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DataItem } from "./data.item";

interface Props {
  date: number;
  card: string;
  purchaseNumber: string;
  currency: string;
  amount: number;
  name: string;
}

export default function SuccessMobile({
  amount,
  card,
  currency,
  date,
  name,
  purchaseNumber,
}: Props) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#F0EBFF] to-[#E5DEFF] px-4">
      <Card className="w-full max-w-[340px] border-[#430AFF]/20 shadow-lg shadow-[#430AFF]/10">
        <CardHeader className="pb-4">
          <CardTitle className="text-center text-xl font-bold text-[#430AFF]">
            Pago Exitoso
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <motion.div
            className="flex justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <CheckCircle className="w-20 h-20 text-[#430AFF]" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-center text-sm text-gray-700">
              ¡Tu pago ha sido procesado con éxito!
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <DataItem label="Numero Pedido" value={purchaseNumber} />
            <DataItem label="Cliente" value={name} />
            <DataItem label="Fecha" value={date} />
            <DataItem label="Tarjeta" value={card} />
            <DataItem label="Moneda" value={currency} />
            <DataItem label="Importe" value={amount.toString()} />
          </motion.div>
        </CardContent>
        <CardFooter className="pt-2">
          <Button
            className="w-full bg-[#430AFF] hover:bg-[#3308CC] transition-colors duration-300 text-sm py-2"
            // onClick={handleGoEvent}
          >
            Volver Inicio
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
