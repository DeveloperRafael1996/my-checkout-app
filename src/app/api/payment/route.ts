import { authorizationPayment } from "@/app/actions/authorization-payment.action";
import { getInfoPayment } from "@/app/actions/save-info-payment.action";
import {
  saveTransactionData,
  saveTransactionError,
} from "@/app/actions/save-transaction-data.action";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const urlBase = process.env.NEXT_PUBLIC_BASE_URL_FRONT;

  try {
    const response = await req.formData();

    const { customerId, name } = await getInfoPayment();

    const transactionToken = response.get("transactionToken") as string;
    const { searchParams } = req.nextUrl;
    const amount = searchParams.get("amount");
    const purchaseNumber = searchParams.get("purchaseNumber");

    const authorizationPaymentResponse = await authorizationPayment({
      token: transactionToken,
      amount: Number(amount),
      clientId: Number(customerId),
      purchaseNumber: Number(purchaseNumber),
      name: name as string,
    });

    if (authorizationPaymentResponse.success === true) {
      const dataMap = authorizationPaymentResponse.data.result.dataMap;

      const data = {
        date: authorizationPaymentResponse.data.result.header
          .ecoreTransactionDate,
        card: `${dataMap.CARD} - ${dataMap.BRAND.toUpperCase()}`,
        purchaseNumber:
          authorizationPaymentResponse.data.result.order.purchaseNumber,
        currency: authorizationPaymentResponse.data.result.order.currency,
        amount: authorizationPaymentResponse.data.result.order.amount,
        name: name,
      };

      await saveTransactionData(data);
    }

    if (authorizationPaymentResponse.success === false) {
      await saveTransactionError(authorizationPaymentResponse.data);

      return NextResponse.redirect(new URL(`/error`, urlBase), 303);
    }

    return NextResponse.redirect(new URL(`/success`, urlBase), 303);
  } catch {
    return NextResponse.redirect(new URL(`/error`, urlBase), 303);
  }
}

export async function GET() {
  return Response.json({ message: "API Payment Is Working!" });
}
