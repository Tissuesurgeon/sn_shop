/** Ghana numbers become E.164. Returns null when the number is not a Ghana mobile. */
export function toE164(input: string): string | null {
  const digits = input.replace(/\D/g, "");
  let local = digits;
  if (local.startsWith("233") && local.length === 12) local = `0${local.slice(3)}`;
  if (local.length === 9) local = `0${local}`;
  if (!/^0[235]\d{8}$/.test(local)) return null;
  return `+233${local.slice(1)}`;
}

export function formatLocalPhone(e164: string): string {
  const digits = e164.replace(/\D/g, "");
  const local = digits.startsWith("233") ? `0${digits.slice(3)}` : digits;
  if (local.length !== 10) return e164;
  return `${local.slice(0, 3)} ${local.slice(3, 6)} ${local.slice(6)}`;
}
