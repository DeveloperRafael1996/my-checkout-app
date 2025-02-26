"use client";

import { Phone } from "lucide-react";

import { Button } from "@/components/ui/button";

export const WhatsappButton = () => {
  const handleWhatsAppSupport = () => {
    window.open(
      "https://wa.me/51999999999?text=Hola,%20necesito%20ayuda%20con%20mi%20pedido",
      "_blank"
    );
  };

  return (
    <Button
      onClick={handleWhatsAppSupport}
      className="w-full py-2 bg-[#25D366] text-white rounded-md hover:bg-[#25D366]/90 transition-colors flex items-center justify-center gap-2"
    >
      <Phone className="w-4 h-4" />
      Contactar por WhatsApp
    </Button>
  );
};
