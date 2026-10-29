import { markOrderPaid } from "@/lib/orders";
import { verifyPaystackSignature } from "@/lib/paystack";

export async function POST(request: Request) {
  const secret = process.env.PAYSTACK_SECRET_KEY ?? "";
  const raw = await request.text();
  const signature = request.headers.get("x-paystack-signature");
  if (!verifyPaystackSignature(raw, signature, secret)) {
    return new Response("Invalid signature", { status: 401 });
  }
  const body = JSON.parse(raw) as {
    event?: string;
    data?: { reference?: string; amount?: number; currency?: string; channel?: string; status?: string };
  };
  if (body.event === "charge.success" && body.data?.reference && body.data.status === "success") {
    await markOrderPaid(body.data.reference, {
      amountPesewas: body.data.amount ?? 0,
      currency: body.data.currency ?? "",
      channel: body.data.channel,
      raw: body,
    });
  }
  return Response.json({ received: true });
}
