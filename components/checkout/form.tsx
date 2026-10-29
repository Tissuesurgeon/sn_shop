"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { placeOrder } from "@/app/(shop)/actions";
import { cartSubtotal, useCart } from "@/components/cart/store";
import { quoteDelivery, type DeliveryRule } from "@/lib/delivery";
import { formatGHS } from "@/lib/format";
import { GHANA_REGIONS } from "@/lib/regions";

type Option = DeliveryRule & { id: string };

declare global {
  interface Window {
    PaystackPop?: { resumeTransaction: (accessCode: string) => void };
  }
}

export function CheckoutForm({
  options,
  freeThreshold,
  paymentsReady,
  demo,
}: {
  options: Option[];
  freeThreshold: number;
  paymentsReady: boolean;
  demo: boolean;
}) {
  const router = useRouter();
  const lines = useCart((state) => state.lines);
  const clear = useCart((state) => state.clear);
  const [region, setRegion] = useState("GREATER_ACCRA");
  const [deliveryCode, setDeliveryCode] = useState(options[0]?.code ?? "");
  const [method, setMethod] = useState<"MOMO" | "CARD" | "WHATSAPP">("MOMO");
  const [network, setNetwork] = useState<"MTN" | "TELECEL" | "AIRTELTIGO">("MTN");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const subtotal = cartSubtotal(lines);
  const hasMadeToMeasure = lines.some((line) => line.madeToMeasure);
  const quotes = useMemo(
    () =>
      options.map((option) => ({
        option,
        quote: quoteDelivery(option, {
          region,
          subtotalPesewas: subtotal,
          freeThresholdPesewas: freeThreshold,
          hasMadeToMeasure,
        }),
      })),
    [options, region, subtotal, freeThreshold, hasMadeToMeasure],
  );
  const selected = quotes.find((entry) => entry.option.code === deliveryCode && entry.quote.available) ?? quotes.find((entry) => entry.quote.available);
  const fee = selected?.quote.feePesewas ?? 0;
  const total = subtotal + fee;

  if (lines.length === 0) {
    return (
      <main id="content" className="w" style={{ padding: "60px 0" }}>
        <h1>
          Your bag is <span className="sc">empty.</span>
        </h1>
        <Link className="btn p" href="/shop">
          Shop the collection
        </Link>
      </main>
    );
  }

  async function onSubmit(formData: FormData) {
    setPending(true);
    setError("");
    const result = await placeOrder({
      items: lines.map((line) => ({
        variantId: line.variantId,
        qty: line.qty,
        madeToMeasure: line.madeToMeasure,
      })),
      fullName: String(formData.get("fullName") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      email: String(formData.get("email") ?? ""),
      region: String(formData.get("region") ?? region) as (typeof GHANA_REGIONS)[number]["value"],
      city: String(formData.get("city") ?? ""),
      gpsAddress: String(formData.get("gps") ?? "") || undefined,
      addressLine: String(formData.get("address") ?? ""),
      landmark: String(formData.get("landmark") ?? "") || undefined,
      deliveryCode: selected?.option.code ?? deliveryCode,
      paymentMethod: method,
      momoNetwork: method === "MOMO" ? network : undefined,
      marketingOptIn: formData.get("marketing") === "on",
    });
    setPending(false);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    clear();
    if ("whatsappUrl" in result && result.whatsappUrl) {
      window.location.href = result.whatsappUrl;
      return;
    }
    if ("demo" in result && result.demo) {
      router.push(`/order/${result.orderNumber}?t=${result.token}`);
      return;
    }
    if ("accessCode" in result && result.accessCode) {
      await loadPaystack();
      window.PaystackPop?.resumeTransaction(result.accessCode);
    }
  }

  return (
    <main id="content" className="w checkout">
      <form action={onSubmit}>
        <p className="eb">Checkout</p>
        <h1>
          Where should we <span className="sc">send</span> it?
        </h1>
        {!paymentsReady && !demo ? (
          <p className="fe">Payments are not configured. You can still order via WhatsApp.</p>
        ) : null}
        <div className="fld">
          <label className="lab" htmlFor="fullName">Full name</label>
          <input className="in" id="fullName" name="fullName" required />
        </div>
        <div className="fld">
          <label className="lab" htmlFor="phone">Phone</label>
          <input className="in" id="phone" name="phone" required placeholder="024 412 7788" />
        </div>
        <div className="fld">
          <label className="lab" htmlFor="email">Email</label>
          <input className="in" id="email" name="email" type="email" required />
        </div>
        <div className="fld">
          <label className="lab" htmlFor="region">Region</label>
          <select className="in sel" id="region" name="region" value={region} onChange={(event) => setRegion(event.target.value)}>
            {GHANA_REGIONS.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>
        <div className="fld">
          <label className="lab" htmlFor="city">City / town</label>
          <input className="in" id="city" name="city" required />
        </div>
        <div className="fld">
          <label className="lab" htmlFor="gps">GhanaPost GPS</label>
          <input className="in" id="gps" name="gps" placeholder="GA-123-4567" />
        </div>
        <div className="fld">
          <label className="lab" htmlFor="address">Address & landmark</label>
          <textarea className="in ta" id="address" name="address" required />
        </div>
        <input type="hidden" name="landmark" value="" />
        <h2 style={{ fontSize: 28 }}>Delivery</h2>
        {quotes.map(({ option, quote }) =>
          quote.available ? (
            <label key={option.code} className={selected?.option.code === option.code ? "rc on" : "rc"}>
              <input
                className="sr-only"
                type="radio"
                name="delivery"
                checked={selected?.option.code === option.code}
                onChange={() => setDeliveryCode(option.code)}
              />
              <span className="rd" />
              <span className="t">
                <b>{option.label}</b>
                <small>{option.etaText}</small>
              </span>
              <span className="tag">{quote.feePesewas === 0 ? "Free" : formatGHS(quote.feePesewas)}</span>
            </label>
          ) : null,
        )}
        <h2 style={{ fontSize: 28, marginTop: 24 }}>Payment</h2>
        {(
          [
            ["MOMO", "Mobile Money"],
            ["CARD", "Card"],
            ["WHATSAPP", "Order via WhatsApp"],
          ] as const
        ).map(([value, label]) => (
          <label key={value} className={method === value ? "rc on" : "rc"}>
            <input className="sr-only" type="radio" name="method" checked={method === value} onChange={() => setMethod(value)} />
            <span className="rd" />
            <span className="t">
              <b>{label}</b>
            </span>
          </label>
        ))}
        {method === "MOMO" ? (
          <div style={{ display: "flex", gap: 8, margin: "8px 0 16px" }}>
            {(["MTN", "TELECEL", "AIRTELTIGO"] as const).map((item) => (
              <button key={item} className={network === item ? "lbl on" : "lbl"} type="button" onClick={() => setNetwork(item)}>
                {item === "AIRTELTIGO" ? "AirtelTigo" : item === "TELECEL" ? "Telecel" : "MTN"}
              </button>
            ))}
          </div>
        ) : null}
        <label className="sm" style={{ display: "flex", gap: 8, margin: "12px 0" }}>
          <input type="checkbox" name="marketing" /> Send me new arrivals
        </label>
        {error ? <p className="fe">{error}</p> : null}
        <button className="btn p b" type="submit" disabled={pending}>
          {pending ? "Stitching your order…" : method === "WHATSAPP" ? "Continue on WhatsApp" : `Pay ${formatGHS(total)}`}
        </button>
      </form>
      <aside className="box stitched">
        <h2>Order summary</h2>
        {lines.map((line) => (
          <div className="sr" key={`${line.variantId}-${line.madeToMeasure}`}>
            <span>
              {line.qty} × {line.name}
              <br />
              <span className="xs muted">Size {line.size}</span>
            </span>
            <span>{formatGHS(line.unitPricePesewas * line.qty)}</span>
          </div>
        ))}
        <div className="sr">
          <span>Subtotal</span>
          <span>{formatGHS(subtotal)}</span>
        </div>
        <div className="sr">
          <span>Delivery</span>
          <span>{fee === 0 ? "Free" : formatGHS(fee)}</span>
        </div>
        <hr className="seam" />
        <div className="sr">
          <b>Total</b>
          <b>{formatGHS(total)}</b>
        </div>
      </aside>
    </main>
  );
}

function loadPaystack() {
  return new Promise<void>((resolve, reject) => {
    if (window.PaystackPop) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Paystack failed to load"));
    document.body.appendChild(script);
  });
}
