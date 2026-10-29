/* ============================================================
   SN STITCHES — STORE CONFIG  (edit me)
   ============================================================ */
window.SN_CONFIG = {
  // ▶ PAYSTACK: paste your PUBLIC key (starts with pk_test_ or pk_live_).
  //   Leave "" to run DEMO MODE (payments are simulated, nothing is charged).
  //   Never put your SECRET key (sk_...) here.
  PAYSTACK_PUBLIC_KEY: "",

  // ▶ WHATSAPP: business number in international format, digits only (no +, no spaces).
  //   PLACEHOLDER — replace with the real SN Stitches number.
  WHATSAPP_NUMBER: "233546923596",

  STORE_NAME: "SN Stitches",
  CURRENCY: "GHS",
  CONTACT_EMAIL: "hello@snstitches.example",

  // Delivery options (prices in GH₵). "accra" options only shown for Greater Accra.
  DELIVERY: [
    { id: "accra-same", label: "Accra same-day (order before 12pm)", price: 40, region: "accra" },
    { id: "accra-next", label: "Accra next-day", price: 25, region: "accra" },
    { id: "regional",   label: "Other regions — 2–4 working days (courier / VIP bus)", price: 55, region: "other" },
    { id: "pickup",     label: "Pick up from studio (Accra) — free", price: 0, region: "any" }
  ],
  FREE_DELIVERY_OVER: 1500,

  REGIONS: ["Greater Accra","Ashanti","Central","Eastern","Western","Western North","Volta","Oti",
    "Northern","Savannah","North East","Upper East","Upper West","Bono","Bono East","Ahafo"]
};
