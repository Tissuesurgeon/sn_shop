const cedisFormat = new Intl.NumberFormat("en-GH", {
  maximumFractionDigits: 0,
});

const cedisFormatWithPesewas = new Intl.NumberFormat("en-GH", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/** Format an integer amount in pesewas as Ghana cedis, e.g. 125000 → "GH₵1,250". */
export function formatGHS(pesewas: number): string {
  const cedis = pesewas / 100;
  const formatted = Number.isInteger(cedis)
    ? cedisFormat.format(cedis)
    : cedisFormatWithPesewas.format(cedis);
  return `GH₵${formatted}`;
}

/** Screen-reader price, e.g. 45000 → "450 Ghana cedis". */
export function formatGHSLabel(pesewas: number): string {
  const cedis = pesewas / 100;
  const amount = Number.isInteger(cedis) ? String(cedis) : cedis.toFixed(2);
  return `${amount} Ghana cedis`;
}
