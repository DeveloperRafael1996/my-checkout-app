"use client";

import { NiubizCheckout } from "./niubiz-checkout";
import { ClientCloseButton } from "./client-close-button";

export function NiubizCheckoutWrapper() {
  const handleClose = () => {};

  return (
    <div className="relative">
      <div className="relative">
        <div className="fixed inset-0" style={{ zIndex: 999999 }}>
          <div className="relative h-full">
            <NiubizCheckout />
            <ClientCloseButton onClose={handleClose} />
          </div>
        </div>
      </div>
    </div>
  );
}

/*
   

*/
