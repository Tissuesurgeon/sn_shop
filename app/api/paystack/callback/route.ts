import { NextResponse } from "next/server";
import { markOrderPaid } from "@/lib/orders";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const reference = new URL(request.url).searchParams.get("reference");
  if (!reference || !process.env.PAYSTACK_SECRET_KEY) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
    headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` },
  });
  const payload = (await response.json()) as {
    data?: { status?: string; amount?: number; currency?: string; channel?: string };
  };
  if (payload.data?.status === "success") {
    await markOrderPaid(reference, {
      amountPesewas: payload.data.amount ?? 0,
      currency: payload.data.currency ?? "",
      channel: payload.data.channel,
      raw: payload,
    });
  }
  const payment = await prisma.payment.findUnique({
    where: { reference },
    include: { order: true },
  });
  if (!payment) return NextResponse.redirect(new URL("/", request.url));
  const destination = new URL(`/order/${payment.order.orderNumber}`, request.url);
  destination.searchParams.set("t", payment.order.accessToken);
  return NextResponse.redirect(destination);
}
