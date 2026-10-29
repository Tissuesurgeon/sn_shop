"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function OrderPoll({
  orderNumber,
  token,
  status,
}: {
  orderNumber: string;
  token: string;
  status: string;
}) {
  const router = useRouter();
  useEffect(() => {
    if (status !== "PENDING") return;
    let tries = 0;
    const timer = setInterval(async () => {
      tries += 1;
      const response = await fetch(`/api/orders/${orderNumber}/status?t=${token}`);
      const body = (await response.json()) as { status?: string };
      if (body.status && body.status !== "PENDING") router.refresh();
      if (tries >= 20) clearInterval(timer);
    }, 3000);
    return () => clearInterval(timer);
  }, [orderNumber, token, status, router]);
  if (status !== "PENDING") return null;
  return <p className="sm muted">Waiting for Paystack to confirm. This page checks for up to a minute.</p>;
}
