"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ClientCloseButtonProps {
  onClose: () => void;
}

export function ClientCloseButton({ onClose }: ClientCloseButtonProps) {
  return (
    <Button
      onClick={onClose}
      size="icon"
      className="fixed right-[30px] top-[30px] rounded-full bg-white shadow-lg hover:bg-white/90 z-[9999999]"
    >
      <X className="h-4 w-4 text-gray-600" />
      <span className="sr-only">Cerrar</span>
    </Button>
  );
}
