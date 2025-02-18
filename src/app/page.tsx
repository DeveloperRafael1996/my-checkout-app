"use client";
//import CheckoutForm from "./components/checkout.form";
import { useSearchParams } from "next/navigation";
import { usePaymentSetup } from "./hooks/usePaymentSetup";
import CheckoutFormNiubiz from "./components/checkout.niubiz";

/*
export default function Home() {
  return (
    <div>
      <CheckoutForm />
    </div>
  );
}

*/

const Home = () => {
  const searchParams = useSearchParams();
  const dataParams = searchParams.get("data");
  const ivParams = searchParams.get("iv");

  const { bodyPay, sessionKey } = usePaymentSetup(dataParams, ivParams);

  return <CheckoutFormNiubiz bodyPay={bodyPay} sessionKey={sessionKey} />;
};

export default Home;
