import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";

/*
export async function POST(req: NextRequest) {
  try {
    const { transactionToken, amount, purchaseNumber, channel, url } =
      await req.json();
    console.log({ transactionToken, amount, purchaseNumber, url });

    if (channel === "pagoefectivo") {
      //return NextResponse.redirect(url);
    } else {
      //return NextResponse.json({ success: true, data });
    }

    return NextResponse.redirect(
      new URL(
        `/success?amount=${amount}&purchaseNumber=${purchaseNumber}&transactionToken=${transactionToken}`,
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
*/

export async function GET() {
  return NextResponse.json({ message: "API Payment Is Working!" });
}

/* Page
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { transactionToken, amount, purchaseNumber } = req.body;

    console.log("Transaction Token:", transactionToken);
    res.redirect(
      `/success?amount=${amount}&purchaseNumber=${purchaseNumber}&transactionToken=${transactionToken}`
    );

    return res
      .status(200)
      .json({ success: true, transactionToken, amount, purchaseNumber });
  } else {
    return res.status(405).json({ error: "Method Not Allowed" });
  }
}
  */

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return NextResponse.json({ message: "API Payment Is Working!" });
  }

  /*
  else if (req.method === 'POST') {
    res.status(200).json({ message: 'Datos recibidos', data: req.body });
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
    */
}
