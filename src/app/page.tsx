/*
  import { Suspense } from "react";
  import { SearchParamsComponent } from "./components/checkout.wrapper";
*/
import { initPaymentConfiguration } from "./actions/payment-configuration-setup.actiont";
import CheckoutFormNiubiz from "./components/checkout.niubiz";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Home({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { data, iv } = await searchParams;
  if (data === undefined || iv === undefined) {
    throw new Error("No Keys");
  }

  const start = performance.now();

  const { bodyPay, sessionKey } = await initPaymentConfiguration({
    data: data as string,
    iv: iv as string,
  });

  const end = performance.now();
  console.log(`Tiempo Ejecución: ${(end - start).toFixed(2)} ms`);
  console.log(`Response Home Init Configuration:`, bodyPay);

  return (
    <div>
      <CheckoutFormNiubiz bodyPay={bodyPay} sessionKey={sessionKey} />
    </div>
  );
}
