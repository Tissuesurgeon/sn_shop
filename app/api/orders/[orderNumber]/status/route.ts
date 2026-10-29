import { prisma } from "@/lib/prisma";

export async function GET(request: Request, context: { params: Promise<{ orderNumber: string }> }) {
  const { orderNumber } = await context.params;
  const token = new URL(request.url).searchParams.get("t");
  if (!token) return Response.json({ error: "missing" }, { status: 401 });
  const order = await prisma.order.findFirst({
    where: { orderNumber, accessToken: token },
    select: { status: true },
  });
  if (!order) return Response.json({ error: "missing" }, { status: 404 });
  return Response.json({ status: order.status });
}
