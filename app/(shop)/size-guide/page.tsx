export const metadata = { title: "Size guide" };

const rows = [
  ["XS", "32", "26", "36"],
  ["S", "34", "28", "38"],
  ["M", "36", "30", "40"],
  ["L", "38", "32", "42"],
  ["XL", "40", "34", "44"],
  ["XXL", "42", "36", "46"],
];

export default function SizeGuidePage() {
  return (
    <main id="content" className="w" style={{ padding: "56px 0 80px" }}>
      <p className="eb">Help · Size guide & FAQ</p>
      <h1>
        Find your <span className="sc">perfect fit</span>
      </h1>
      <table className="t">
        <thead>
          <tr>
            <th>Size</th>
            <th>Bust (in)</th>
            <th>Waist (in)</th>
            <th>Hip (in)</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row[0]}>
              {row.map((cell) => (
                <td key={cell}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="muted">Between sizes, or ordering for an occasion? Choose made to measure and we&apos;ll cut it to you.</p>
      <p>
        <a className="lnk" href="/faq">
          Delivery and returns →
        </a>
      </p>
    </main>
  );
}
