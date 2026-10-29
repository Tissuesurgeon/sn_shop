"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { TapeMeasure } from "@/components/atelier";
import { useCart } from "@/components/cart/store";
import { formatGHS } from "@/lib/format";
import type { CatalogProduct } from "@/lib/catalog";

const sizes = ["XS", "S", "M", "L", "XL", "XXL"] as const;

export function BuyBox({ product }: { product: CatalogProduct }) {
  const add = useCart((state) => state.add);
  const router = useRouter();
  const [size, setSize] = useState("M");
  const [madeToMeasure, setMadeToMeasure] = useState(false);
  const colour = product.variants[0];
  const stockForSize = useMemo(() => {
    const map = new Map<string, number>();
    for (const variant of product.variants) {
      if (!colour || variant.colourName === colour.colourName) map.set(variant.size, variant.stockQty);
    }
    return map;
  }, [product.variants, colour]);
  const soldOut = sizes.filter((entry) => (stockForSize.get(entry) ?? 0) <= 0);
  const variant = product.variants.find(
    (entry) => entry.size === size && (!colour || entry.colourName === colour.colourName),
  );
  const fee = product.madeToMeasure ? (product.mtmFeePesewas ?? 0) : 0;
  const unit = (variant?.priceOverridePesewas ?? product.pricePesewas) + (madeToMeasure ? fee : 0);
  const unavailable = !variant || (!madeToMeasure && variant.stockQty <= 0);

  function addToBag() {
    if (!variant || unavailable) return;
    add({
      variantId: variant.id,
      slug: product.slug,
      name: product.name,
      size: variant.size,
      colour: variant.colourName,
      image: product.images[0]?.url ?? "/sample/d1.webp",
      qty: 1,
      madeToMeasure,
      unitPricePesewas: unit,
    });
  }

  return (
    <div>
      <p className="eb">
        {product.category.name} · {product.length === "PLAYSUIT" ? "Playsuit" : product.length}
      </p>
      <h1 className="pt">{product.name}</h1>
      <p style={{ fontSize: 28, margin: "8px 0 16px" }}>
        {formatGHS(unit)}
        {product.compareAtPesewas ? (
          <s className="muted" style={{ marginLeft: 8, fontSize: 18 }}>
            {formatGHS(product.compareAtPesewas)}
          </s>
        ) : null}
      </p>
      <p className="muted">{product.description}</p>
      <p className="lab">
        Colour — <b>{colour?.colourName}</b>
      </p>
      <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
        <i
          className="swc"
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            display: "inline-block",
            background: colour?.colourHex ?? "#E07A1F",
            boxShadow: "0 0 0 2px var(--cream), 0 0 0 3.5px var(--mag)",
          }}
        />
      </div>
      <p className="lab">Size</p>
      <TapeMeasure sizes={sizes} value={size} soldOut={soldOut} onSelect={setSize} />
      {product.madeToMeasure ? (
        <label className="mtm-toggle stitched" style={{ display: "flex", gap: 12, marginTop: 18, padding: 14 }}>
          <input
            type="checkbox"
            checked={madeToMeasure}
            onChange={(event) => setMadeToMeasure(event.target.checked)}
          />
          <span>
            <b>Make it to measure {fee ? `+${formatGHS(fee)}` : ""}</b>
            <br />
            <span className="sm muted">
              Send your measurements after checkout. Ready in {product.leadTimeDays ?? 10} days.
            </span>
          </span>
        </label>
      ) : null}
      <div style={{ display: "flex", gap: 10, marginTop: 18, flexWrap: "wrap" }}>
        <button className="btn p" type="button" disabled={unavailable} onClick={addToBag}>
          {unavailable ? "Sold out" : "Add to bag"}
        </button>
        <button
          className="btn g"
          type="button"
          disabled={unavailable}
          onClick={() => {
            addToBag();
            router.push("/checkout");
          }}
        >
          Buy now
        </button>
      </div>
      <div className="stickybuy">
        <b>{formatGHS(unit)}</b>
        <button className="btn p s" type="button" disabled={unavailable} onClick={addToBag}>
          {unavailable ? "Sold out" : "Add to bag"}
        </button>
      </div>
      <div style={{ marginTop: 28 }}>
        {product.details.map((detail) => (
          <p key={detail} className="sm muted" style={{ margin: "6px 0" }}>
            {detail}
          </p>
        ))}
      </div>
    </div>
  );
}
