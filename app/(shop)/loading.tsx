export default function ShopLoading() {
  return (
    <main id="content" className="w" style={{ padding: "80px 0", textAlign: "center" }}>
      <div className="running" aria-hidden="true">
        <i /><i /><i /><i /><i /><i />
      </div>
      <p className="sm muted">Stitching the page…</p>
    </main>
  );
}
