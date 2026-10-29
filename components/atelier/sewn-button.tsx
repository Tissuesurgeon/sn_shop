export function SewnButton() {
  return (
    <span className="btnicon" aria-hidden="true">
      <i />
      <i />
      <i />
      <i />
    </span>
  );
}

export function CartBadge({ count }: { count: number }) {
  return (
    <span className="bag">
      <svg className="ic" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 8h14l-1.2 12H6.2L5 8z" />
        <path d="M9 8a3 3 0 0 1 6 0" />
      </svg>
      <span className="count">{count}</span>
      <span className="sr-only">{count} in the bag</span>
    </span>
  );
}
