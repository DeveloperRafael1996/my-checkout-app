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
import { Client, TransactionState } from "../dto/transaction.dto";
import { convertTimestampText } from "../utils/date";
import { DataItem, DataItemAlternative } from "./data.item";

export default function SuccessMobile({
  data,
  purchaseNumber,
  showAlternativeView = false,
  client,
}: {
  data: TransactionState;
  purchaseNumber: number
  showAlternativeView?: boolean;
  client: Client,
}) {
  if (data.status !== "success") return null;

  const { order, dataMap, header } = data.data;
  const date = convertTimestampText(header.ecoreTransactionDate);
  const card = `${dataMap.CARD} - ${dataMap.BRAND.toUpperCase()}`;

  const handleGoEvent = () => {
    console.log(`Send Event`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#F0EBFF] to-[#E5DEFF] px-4">
      <Card className="w-full max-w-[340px] border-[#430AFF]/20 shadow-lg shadow-[#430AFF]/10">
        <CardHeader className="pb-4">
          <CardTitle className="text-center text-xl font-bold text-[#430AFF]">
            Pago Exitoso { dataMap.STATUS }
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

          {showAlternativeView ? (
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <DataItemAlternative
                label="Numero Pedido"
                value={purchaseNumber}
              />
              <DataItemAlternative
                label="Cliente"
                value="Rafael Guevara Aller"
              />
              <DataItemAlternative label="Fecha" value={date} />
              <DataItemAlternative label="Tarjeta" value={card} />
              <DataItemAlternative label="Moneda" value={order.currency} />
              <DataItemAlternative
                label="Importe"
                value={order.amount.toString()}
              />
            </motion.div>
          ) : (
            <motion.div
              className="grid grid-cols-2 gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <DataItem label="Numero Pedido" value={purchaseNumber} />
              <DataItem label="Cliente" value={client.name} />
              <DataItem label="Fecha" value={date} />
              <DataItem label="Tarjeta" value={card} />
              <DataItem label="Moneda" value={order.currency} />
              <DataItem label="Importe" value={order.amount.toString()} />
            </motion.div>
          )}
        </CardContent>
        <CardFooter className="pt-2">
          <Button
            className="w-full bg-[#430AFF] hover:bg-[#3308CC] transition-colors duration-300 text-sm py-2"
            onClick={handleGoEvent}
          >
            Volver Inicio
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
