import { Metadata } from "next/types";
import { initPaymentConfiguration } from "./actions/payment-configuration-setup.actiont";
import CheckoutFormNiubiz from "./components/checkout.niubiz";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export async function generateMetadata({
  searchParams,
}: {
  searchParams: SearchParams;
}): Promise<Metadata> {
  const { data, iv } = await searchParams;
  if (!data || !iv) {
    return {
      title: "Error - No Keys",
      description: "No se encontraron claves de configuración",
    };
  }

  try {
    const { bodyPay } = await initPaymentConfiguration({
      data: String(data),
      iv: String(iv),
    });

    return {
      title: `Pago - ${bodyPay?.purchaseNumber ?? "Pago"}`,
      description: `Realiza tu pago de forma segura con nuestro servicio.`,
    };
  } catch (error) {
    console.error(error);
    return {
      title: "Error en el pago",
      description: "Hubo un problema al cargar la configuración de pago.",
    };
  }
}

export default async function Home({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { data, iv } = await searchParams;
  if (data === undefined || iv === undefined) {
    throw new Error("No Keys");
  }

  const { bodyPay, sessionKey } = await initPaymentConfiguration({
    data: data as string,
    iv: iv as string,
  });

  if (!bodyPay || !sessionKey) {
    throw new Error("No Keys");
  }

  return (
    <>
      <div>
        <CheckoutFormNiubiz bodyPay={bodyPay} sessionKey={sessionKey} />
      </div>
    </>
  );
}
