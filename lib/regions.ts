import type { GhanaRegion } from "@prisma/client";

export const GHANA_REGIONS: { value: GhanaRegion; label: string }[] = [
  { value: "GREATER_ACCRA", label: "Greater Accra" },
  { value: "ASHANTI", label: "Ashanti" },
  { value: "CENTRAL", label: "Central" },
  { value: "EASTERN", label: "Eastern" },
  { value: "WESTERN", label: "Western" },
  { value: "WESTERN_NORTH", label: "Western North" },
  { value: "VOLTA", label: "Volta" },
  { value: "OTI", label: "Oti" },
  { value: "NORTHERN", label: "Northern" },
  { value: "SAVANNAH", label: "Savannah" },
  { value: "NORTH_EAST", label: "North East" },
  { value: "UPPER_EAST", label: "Upper East" },
  { value: "UPPER_WEST", label: "Upper West" },
  { value: "BONO", label: "Bono" },
  { value: "BONO_EAST", label: "Bono East" },
  { value: "AHAFO", label: "Ahafo" },
];

export function regionLabel(value: string): string {
  return GHANA_REGIONS.find((region) => region.value === value)?.label ?? value;
}
