import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const response = await req.formData();

    const url = response.get("url") as string;
    const transactionToken = response.get("transactionToken") as string;
    const channel = response.get("channel") as string;

    const { searchParams } = new URL(req.url);
    const amount = searchParams.get("amount");
    const purchaseNumber = searchParams.get("purchaseNumber");

    if (channel === "pagoefectivo") {
      //CIP --> TransactionToken
      //Save Code CIP BD Associate To Order
      return NextResponse.redirect(url);
    }

    return NextResponse.redirect(
      new URL(
        `/success?transactionToken=${transactionToken}&amount=${amount}&purchaseNumber=${purchaseNumber}`,
        req.nextUrl.origin
      )
    );
  } catch {
    //Save Error
    return NextResponse.json(
      { success: false, message: "Error Process Form" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return Response.json({ message: "API Payment Is Working!" });
}
