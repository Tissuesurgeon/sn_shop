export type DeliveryRule = {
  code: string;
  label: string;
  etaText: string;
  feePesewas: number;
  regions: string[];
  cutoffTime: string | null;
  isPickup: boolean;
};

export function sameDayOpen(now = new Date()): boolean {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Africa/Accra",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const weekday = parts.find((part) => part.type === "weekday")?.value;
  const hour = Number(parts.find((part) => part.type === "hour")?.value);
  if (weekday === "Sun") return false;
  return hour < 12;
}

export function quoteDelivery(
  option: DeliveryRule,
  input: {
    region: string;
    subtotalPesewas: number;
    freeThresholdPesewas: number;
    hasMadeToMeasure: boolean;
    now?: Date;
  },
): { available: boolean; feePesewas: number } {
  const servesRegion = option.regions.length === 0 || option.regions.includes(input.region);
  if (!servesRegion) return { available: false, feePesewas: option.feePesewas };

  if (option.code === "ACCRA_SAME_DAY") {
    if (input.hasMadeToMeasure || !sameDayOpen(input.now)) {
      return { available: false, feePesewas: option.feePesewas };
    }
  }

  const free = !option.isPickup && input.subtotalPesewas >= input.freeThresholdPesewas;
  return { available: true, feePesewas: free ? 0 : option.feePesewas };
}
