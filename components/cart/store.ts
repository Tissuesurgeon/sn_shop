"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartLine = {
  variantId: string;
  slug: string;
  name: string;
  size: string;
  colour: string;
  image: string;
  qty: number;
  madeToMeasure: boolean;
  unitPricePesewas: number;
};

type CartState = {
  lines: CartLine[];
  open: boolean;
  add: (line: CartLine) => void;
  setQty: (variantId: string, madeToMeasure: boolean, qty: number) => void;
  remove: (variantId: string, madeToMeasure: boolean) => void;
  clear: () => void;
  setOpen: (open: boolean) => void;
  replacePrices: (updates: { variantId: string; madeToMeasure: boolean; unitPricePesewas: number }[]) => void;
};

function same(line: CartLine, variantId: string, madeToMeasure: boolean) {
  return line.variantId === variantId && line.madeToMeasure === madeToMeasure;
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      open: false,
      setOpen: (open) => set({ open }),
      add: (line) =>
        set((state) => {
          const existing = state.lines.find((item) => same(item, line.variantId, line.madeToMeasure));
          const lines = existing
            ? state.lines.map((item) =>
                same(item, line.variantId, line.madeToMeasure)
                  ? { ...item, qty: Math.min(8, item.qty + line.qty) }
                  : item,
              )
            : [...state.lines, line];
          return { lines, open: true };
        }),
      setQty: (variantId, madeToMeasure, qty) =>
        set((state) => ({
          lines: state.lines
            .map((item) => (same(item, variantId, madeToMeasure) ? { ...item, qty } : item))
            .filter((item) => item.qty > 0),
        })),
      remove: (variantId, madeToMeasure) =>
        set((state) => ({
          lines: state.lines.filter((item) => !same(item, variantId, madeToMeasure)),
        })),
      clear: () => set({ lines: [] }),
      replacePrices: (updates) =>
        set((state) => ({
          lines: state.lines.map((line) => {
            const next = updates.find(
              (item) => item.variantId === line.variantId && item.madeToMeasure === line.madeToMeasure,
            );
            return next ? { ...line, unitPricePesewas: next.unitPricePesewas } : line;
          }),
        })),
    }),
    { name: "sn-stitches-bag", partialize: (state) => ({ lines: state.lines }) },
  ),
);

export function cartCount(lines: CartLine[]): number {
  return lines.reduce((sum, line) => sum + line.qty, 0);
}

export function cartSubtotal(lines: CartLine[]): number {
  return lines.reduce((sum, line) => sum + line.unitPricePesewas * line.qty, 0);
}
