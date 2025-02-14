import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const response = await req.formData();

    const transactionToken = response.get("transactionToken") as string;
    const customerEmail = response.get("customerEmail") as string;
    const channel = response.get("channel") as string;
    const url = response.get("url") as string;

    // const { transactionToken, customerEmail, channel, url } = await req.formData();
    console.log({ transactionToken, customerEmail, url });

    if (channel === "pagoefectivo") {
      //return NextResponse.redirect(url);
    } else {
      //return NextResponse.json({ success: true, data });
    }

    return NextResponse.redirect(
      new URL(
        `/success?&transactionToken=${transactionToken}`,
        req.nextUrl.origin
      )
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: "Error Process Pay" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return Response.json({ message: "API Payment Is Working!" });
}
