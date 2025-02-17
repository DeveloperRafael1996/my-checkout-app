import { NiubizCheckoutWrapper } from "./components/niubiz-checkout-wrapper";

/*
export default function Home() {
  const handleClose = () => {};

  return (
    <div>
      <NiubizCheckout onClose={handleClose} />
    </div>
  );
}
  */


export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <NiubizCheckoutWrapper />
    </div>
  );
}
