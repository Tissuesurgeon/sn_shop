"use client";

export default function ShopError({ reset }: { error: Error; reset: () => void }) {
  return (
    <main id="content" className="w" style={{ padding: "64px 0" }}>
      <h1>
        A seam <span className="sc">snagged.</span>
      </h1>
      <p className="muted">The page could not be stitched. Try again, or come back to the shop.</p>
      <button className="btn p" type="button" onClick={reset}>
        Try again
      </button>
    </main>
  );
}
