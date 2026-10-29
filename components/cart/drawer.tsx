"use client";

import { useEffect } from "react";
import Link from "next/link";
import { validateCart } from "@/app/(shop)/actions";
import { formatGHS } from "@/lib/format";
import { cartSubtotal, useCart } from "./store";

export function CartDrawer({ freeThreshold }: { freeThreshold: number }) {
  const open = useCart((state) => state.open);
  const setOpen = useCart((state) => state.setOpen);
  const lines = useCart((state) => state.lines);
  const setQty = useCart((state) => state.setQty);
  const remove = useCart((state) => state.remove);
  const replacePrices = useCart((state) => state.replacePrices);
  const signature = lines.map((line) => `${line.variantId}:${line.qty}:${line.madeToMeasure}`).join("|");
  useEffect(() => {
    if (!open || signature.length === 0) return;
    let cancelled = false;
    const current = useCart.getState().lines;
    validateCart(
      current.map((line) => ({ variantId: line.variantId, qty: line.qty, madeToMeasure: line.madeToMeasure })),
    )
      .then((priced) => {
        if (cancelled) return;
        replacePrices(
          priced.lines.map((line) => ({
            variantId: line.variantId,
            madeToMeasure: line.madeToMeasure,
            unitPricePesewas: line.unitPricePesewas,
          })),
        );
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, [open, signature, replacePrices]);
  if (!open) return null;
  const subtotal = cartSubtotal(lines);
  const remaining = Math.max(0, freeThreshold - subtotal);
  const progress = Math.min(100, Math.round((subtotal / freeThreshold) * 100));

  return (
    <div className="drawer" role="presentation" onClick={() => setOpen(false)}>
      <div
        className="dpanel"
        role="dialog"
        aria-label="Your bag"
        onClick={(event) => event.stopPropagation()}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ margin: 0 }}>Your bag</h2>
          <button className="btn g s" type="button" onClick={() => setOpen(false)}>
            Close
          </button>
        </div>
        {lines.length === 0 ? (
          <div style={{ padding: "40px 0" }}>
            <p className="sc" style={{ fontSize: 40 }}>
              Empty bag
            </p>
            <p className="muted">Your bag is waiting for a dress. The collection is cut and finished in Accra.</p>
            <Link className="btn p" href="/shop" onClick={() => setOpen(false)}>
              Shop the collection
            </Link>
          </div>
        ) : (
          <>
            {lines.map((line) => (
              <div className="dline" key={`${line.variantId}-${line.madeToMeasure}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={line.image} alt="" />
                <div style={{ flex: 1 }}>
                  <b>{line.name}</b>
                  <div className="xs muted">
                    Size {line.size}
                    {line.madeToMeasure ? " · Made to measure" : ""} · {line.colour}
                  </div>
                  <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                    <button type="button" className="btn g s" onClick={() => setQty(line.variantId, line.madeToMeasure, line.qty - 1)}>
                      −
                    </button>
                    <span>{line.qty}</span>
                    <button type="button" className="btn g s" onClick={() => setQty(line.variantId, line.madeToMeasure, line.qty + 1)}>
                      +
                    </button>
                    <button type="button" className="lnk" onClick={() => remove(line.variantId, line.madeToMeasure)}>
                      Remove
                    </button>
                  </div>
                </div>
                <span>{formatGHS(line.unitPricePesewas * line.qty)}</span>
              </div>
            ))}
            <p className="sm muted" style={{ marginTop: 16 }}>
              {remaining === 0 ? "Free delivery is stitched in." : `Add ${formatGHS(remaining)} for free delivery.`}
            </p>
            <div className="progress" aria-hidden="true">
              <i style={{ width: `${progress}%` }} />
            </div>
            <div className="sr" style={{ marginTop: 16 }}>
              <span>Subtotal</span>
              <b>{formatGHS(subtotal)}</b>
            </div>
            <p className="xs muted">Delivery is calculated at checkout. Prices are confirmed by the studio.</p>
            <Link className="btn p b" href="/checkout" onClick={() => setOpen(false)}>
              Checkout
            </Link>
            <a className="btn wa b" style={{ marginTop: 10 }} href="https://wa.me/233546923596">
              Order via WhatsApp
            </a>
          </>
        )}
      </div>
    </div>
  );
}
