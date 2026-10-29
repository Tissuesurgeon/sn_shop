import type { Metadata } from "next";
import Image from "next/image";
import {
  Button,
  CartBadge,
  Foil,
  HangTag,
  Input,
  KenteBand,
  Linen,
  MomoMark,
  OutlinedNumeral,
  Pill,
  ProductCard,
  RadioCard,
  RunningStitch,
  Seam,
  SelectFace,
  SewnButton,
  StatusChip,
  StitchedCard,
  TailorLabel,
  TapeMeasure,
  TextLink,
  ThreadLine,
  Toast,
} from "@/components/atelier";
import "./sheet.css";

export const metadata: Metadata = {
  title: "Design system",
  description:
    "SN Stitches Atelier UI kit: stitch seams, gold foil, linen, hang tags and tape-measure sizes.",
};

const swatches: { name: string; hex: string; note: string; lined?: boolean }[] = [
  { name: "Magenta 600", hex: "#B0185E", note: "Primary · CTA · links" },
  { name: "Magenta 700", hex: "#8C1149", note: "Hover / pressed" },
  { name: "Magenta 50", hex: "#FDF3F7", note: "Selected bg", lined: true },
  { name: "Gold 500", hex: "#D4A437", note: "Foil · borders · focus" },
  { name: "Gold 700", hex: "#B8891F", note: "Eyebrows · small gold text" },
  { name: "Ink 900", hex: "#141414", note: "Text · dark sections" },
  { name: "Cream 50", hex: "#FBF6EE", note: "Page (linen)", lined: true },
  { name: "Sand 100", hex: "#F3EADB", note: "Alt sections", lined: true },
  { name: "Line 200", hex: "#E6DCCB", note: "Borders", lined: true },
  { name: "Muted 600", hex: "#6E655C", note: "Secondary text" },
  { name: "Success", hex: "#1F7A4D", note: "Delivered · paid ok" },
  { name: "WhatsApp", hex: "#1F8F4E", note: "WhatsApp only" },
  { name: "Warning", hex: "#9A6A00", note: "Pending · low stock" },
  { name: "Error", hex: "#B3261E", note: "Errors · cancelled" },
  { name: "Info", hex: "#1F4E8C", note: "Processing" },
];

const scale = [4, 8, 12, 16, 24, 32, 40, 56, 72, 96];

function SectionTitle({ index, children }: { index: string; children: string }) {
  return (
    <h2 className="dsh">
      <OutlinedNumeral>{index}</OutlinedNumeral>
      {children}
    </h2>
  );
}

export default function DesignSystemPage() {
  return (
    <>
      <KenteBand />
      <main id="content" className="w dsw">
        <div className="dshead">
          <Image
            src="/brand/logo.webp"
            alt=""
            width={240}
            height={260}
            priority
            style={{ height: 120, width: "auto" }}
          />
          <div>
            <p className="eb">SN Stitches · UI kit v1 · “Atelier”</p>
            <h1>
              Design <span className="sc">system</span>
            </h1>
            <p className="muted" style={{ maxWidth: 640 }}>
              Tailoring craft as the interface: dashed stitch seams, gold-foil hairlines, linen
              texture, hang-tag prices, tape-measure sizes and sewn-button badges — on calm cream
              with magenta accents.
            </p>
          </div>
        </div>

        <SectionTitle index="01">Colour</SectionTitle>
        <div className="sws">
          {swatches.map((swatch) => (
            <div className="swb" key={swatch.hex + swatch.name}>
              <div
                className={swatch.lined ? "chipc lined" : "chipc"}
                style={{ background: swatch.hex }}
              />
              <b>{swatch.name}</b>
              <span className="xs muted">
                {swatch.hex} · {swatch.note}
              </span>
            </div>
          ))}
        </div>

        <SectionTitle index="02">Typography</SectionTitle>
        <div className="typ">
          <div>
            <span className="xs muted">
              DISPLAY · Cormorant Garamond 600 · 82/80 desktop · 50 mobile
            </span>
            <div className="display-sample">Dresses with a story</div>
          </div>
          <div>
            <span className="xs muted">SCRIPT ACCENT · Great Vibes · max once per view</span>
            <div className="sc script-sample">stitched for you</div>
          </div>
          <div className="tyg">
            <div>
              <span className="xs muted">H1 · 52/34</span>
              <h2 className="sample-h1">Shop dresses</h2>
            </div>
            <div>
              <span className="xs muted">H2 · 44/30</span>
              <h3 className="sample-h2">New in the atelier</h3>
            </div>
            <div>
              <span className="xs muted">H3 · 22/19</span>
              <h4 className="sample-h3">Adwoa Ankara Wrap Midi</h4>
            </div>
          </div>
          <div className="tyg">
            <div>
              <span className="xs muted">EYEBROW · Jost 500 · 12 · .22em</span>
              <p className="eb">New season · Made in Accra</p>
            </div>
            <div>
              <span className="xs muted">BODY · Jost 400 · 16/1.55</span>
              <p style={{ margin: 0 }}>Hand-finished in Accra and delivered to all 16 regions.</p>
            </div>
            <div>
              <span className="xs muted">NUMERALS · outlined gold</span>
              <OutlinedNumeral size={80}>07</OutlinedNumeral>
            </div>
          </div>
        </div>

        <SectionTitle index="03">Buttons</SectionTitle>
        <div className="row">
          <div className="bcol">
            <span className="xs muted">Primary · default</span>
            <Button href="#kit">Add to bag</Button>
          </div>
          <div className="bcol">
            <span className="xs muted">Hover / pressed</span>
            <Button href="#kit" visual="hover">
              Add to bag
            </Button>
          </div>
          <div className="bcol">
            <span className="xs muted">Focus (gold ring)</span>
            <Button href="#kit" visual="focus">
              Add to bag
            </Button>
          </div>
          <div className="bcol">
            <span className="xs muted">Disabled</span>
            <Button href="#kit" disabled>
              Add to bag
            </Button>
          </div>
          <div className="bcol">
            <span className="xs muted">Loading</span>
            <Button href="#kit" loading>
              Processing
            </Button>
          </div>
        </div>
        <div className="row" style={{ marginTop: 18 }}>
          <div className="bcol">
            <span className="xs muted">Secondary</span>
            <Button href="#kit" variant="secondary">
              Checkout
            </Button>
          </div>
          <div className="bcol">
            <span className="xs muted">Ghost</span>
            <Button href="#kit" variant="ghost">
              Made to measure
            </Button>
          </div>
          <div className="bcol">
            <span className="xs muted">Gold foil (dark bg)</span>
            <Button href="#kit" variant="gold">
              Shop evening
            </Button>
          </div>
          <div className="bcol">
            <span className="xs muted">WhatsApp</span>
            <Button href="#kit" variant="whatsapp">
              Order via WhatsApp
            </Button>
          </div>
          <div className="bcol">
            <span className="xs muted">Small / link</span>
            <div className="link-row">
              <Button href="#kit" size="small">
                Save
              </Button>
              <TextLink href="#product-card">View all →</TextLink>
            </div>
          </div>
        </div>

        <SectionTitle index="04">Inputs &amp; selectors</SectionTitle>
        <div className="ing">
          <Input label="Default" placeholder="Full name" readOnly />
          <Input label="Focus — stitched" state="focus" defaultValue="Akosua Mensah|" readOnly />
          <Input
            label="Error"
            state="error"
            defaultValue="024 41"
            error="Enter a 10-digit Ghana number"
            readOnly
          />
          <SelectFace label="Select" value="Greater Accra" />
        </div>
        <div className="ing2">
          <div>
            <span className="lab">Tape-measure size selector (selected M, XXL sold out)</span>
            <TapeMeasure value="M" soldOut={["XXL"]} />
          </div>
          <div>
            <span className="lab">Tailor-label filter chips</span>
            <TailorLabel selected>Ankara</TailorLabel>
            <TailorLabel>Kente</TailorLabel>
            <TailorLabel>Evening</TailorLabel>
            <TailorLabel>Maxi</TailorLabel>
          </div>
          <div>
            <span className="lab">Radio card (delivery / payment)</span>
            <RadioCard
              title="Accra same-day"
              detail="Order before 12:00"
              checked
              price={<HangTag amount={4000} />}
            />
          </div>
        </div>

        <SectionTitle index="05">Tags, badges &amp; status</SectionTitle>
        <div className="row" style={{ alignItems: "center" }}>
          <HangTag amount={45000} />
          <HangTag amount={125000} compareAt={145000} />
          <HangTag amount={78000} size="big" />
          <HangTag amount={42000} size="big" tone="magenta" prefix="New · " />
          <Pill tone="new">New</Pill>
          <Pill tone="sale">Sale</Pill>
          <Pill tone="sold">Sold out</Pill>
          <Pill tone="sample">Sample</Pill>
          <CartBadge count={3} />
          <span className="xs muted">← sewn-button cart count</span>
        </div>
        <div className="row" style={{ marginTop: 14 }}>
          <StatusChip tone="pending">Pending</StatusChip>
          <StatusChip tone="paid">Paid</StatusChip>
          <StatusChip tone="processing">Processing</StatusChip>
          <StatusChip tone="shipped">Shipped</StatusChip>
          <StatusChip tone="delivered">Delivered</StatusChip>
          <StatusChip tone="cancelled">Cancelled</StatusChip>
          <MomoMark network="mtn" />
          <MomoMark network="tel" />
          <MomoMark network="at" />
          <MomoMark network="visa" />
          <MomoMark network="mc" />
        </div>

        <SectionTitle index="06">Product card &amp; motifs</SectionTitle>
        <div className="pcg" id="product-card">
          <div>
            <span className="xs muted">Default</span>
            <ProductCard
              name="Adwoa Ankara Wrap Midi"
              meta="Ankara · Midi"
              price={45000}
              image="/design-system/d1.webp"
              alt="Adwoa Ankara Wrap Midi"
              priority
            />
          </div>
          <div>
            <span className="xs muted">Hover — lift + stitch outline + quick add</span>
            <ProductCard
              name="Sika Tie-Dye Playsuit"
              meta="Casual · Playsuit"
              price={42000}
              image="/design-system/playsuit-2.webp"
              alt="Sika Tie-Dye Playsuit"
              badge="new"
              forceHover
              quickAdd
              priority
            />
          </div>
          <div>
            <span className="xs muted">Sale</span>
            <ProductCard
              name="Esi Emerald Satin Gown"
              meta="Evening · Maxi"
              price={125000}
              compareAt={145000}
              image="/design-system/d3.webp"
              alt="Esi Emerald Satin Gown"
              badge="sale"
              priority
            />
          </div>
          <div className="motifs">
            <span className="xs muted">Signature motifs</span>
            <div className="mo">
              <Seam className="w-full" />
              <span className="xs">Seam divider</span>
            </div>
            <div className="mo">
              <KenteBand />
              <span className="xs">Kente band (8px / 4px)</span>
            </div>
            <div className="mo">
              <StitchedCard className="motif-stitch" />
              <span className="xs">Stitched card inset</span>
            </div>
            <div className="mo">
              <Foil className="motif-foil" />
              <span className="xs">Gold-foil hairline frame</span>
            </div>
            <div className="mo">
              <Linen className="motif-linen" />
              <span className="xs">Linen texture</span>
            </div>
            <div className="mo">
              <ThreadLine />
              <span className="xs">Thread line (draws on scroll)</span>
            </div>
            <div className="mo" style={{ flexDirection: "row", gap: 14, alignItems: "center" }}>
              <RunningStitch />
              <span className="xs">Running-stitch loader</span>
              <SewnButton />
              <span className="xs">Button icon</span>
            </div>
          </div>
        </div>

        <SectionTitle index="07">Toasts, spacing &amp; radii</SectionTitle>
        <div className="row" style={{ alignItems: "center" }}>
          <Toast>Added to your bag</Toast>
          <Toast tone="success" icon={false}>
            ✓ Payment confirmed
          </Toast>
          <Toast tone="error" icon={false}>
            ⚠ MoMo prompt expired — try again
          </Toast>
        </div>
        <div className="scale">
          {scale.map((step) => (
            <div className="scale-item" key={step}>
              <div className="scale-swatch" style={{ width: step, height: step }} />
              <span className="xs muted">{step}</span>
            </div>
          ))}
          <div className="radii">
            <div className="scale-item">
              <div className="radius-box r-input" />
              <span className="xs muted">Input 10</span>
            </div>
            <div className="scale-item">
              <div className="radius-box r-card" />
              <span className="xs muted">Card 14</span>
            </div>
            <div className="scale-item">
              <div className="radius-box r-pill" />
              <span className="xs muted">Pill</span>
            </div>
            <div className="scale-item">
              <div className="radius-box r-arch" />
              <span className="xs muted">Arch</span>
            </div>
          </div>
        </div>
      </main>
      <KenteBand />
    </>
  );
}
